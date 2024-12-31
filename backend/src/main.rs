use std::{collections::HashMap, net::SocketAddr, str::FromStr, sync::Arc};

use futures_util::{stream::StreamExt, SinkExt, TryFutureExt};
use tokio::sync::{mpsc, RwLock};
use tokio_stream::wrappers::UnboundedReceiverStream;
use warp::{filters::ws::{Message, WebSocket}, Filter};


#[macro_use]
extern crate dotenv_codegen;


#[derive(Debug)]
struct ServerProperties {
    address: SocketAddr,
}

fn get_server_properties() -> Result<ServerProperties, Box<dyn std::error::Error>> {
    env_logger::builder()
        .filter_level(log::LevelFilter::from_str(dotenv!("RUST_LOG"))?)
        .init();

    let host = dotenv!("HOST");
    let port= dotenv!("PORT");

    let address: SocketAddr = format!("{host}:{port}").parse::<SocketAddr>().unwrap_or_else(move |err| {
        log::error!("{err} : HOST={host} PORT={port}");
        "127.0.0.1:8000".parse().unwrap()
    });

    Ok(ServerProperties {
        address
    })
}

/// TODO
///
/// key is a game "id"
type Games = Arc<RwLock<HashMap<usize, mpsc::UnboundedSender<Message>>>>;

async fn player_connected(ws: WebSocket, games: Games, game_id: u64) {
    log::info!("ws={ws:?}, games={games:?}, game_id={game_id}");

    let (mut player_ws_tx, mut player_ws_rx) = ws.split();

    // Use an unbounded channel to handle buffering and flushing of messages
    // to the websocket...
    let (tx, rx) = mpsc::unbounded_channel();
    let mut rx = UnboundedReceiverStream::new(rx);

    tokio::task::spawn(async move {
        while let Some(message) = rx.next().await {
            player_ws_tx
                .send(message)
                .unwrap_or_else(|e| {
                    log::error!("websocket send error: {}", e);
                })
                .await;
        }
    });
}


#[tokio::main]
async fn main() {
    let server_properties = get_server_properties().expect("Could not set up the server");

    let games = Games::default();
    let games = warp::any().map(move || games.clone());

    let enter_game = warp::path("game")
        // The `ws()` filter will prepare Websocket handshake...
        .and(warp::ws())
        .and(games)
        .map(|ws: warp::ws::Ws, games| {
            // This will call our function if the handshake succeeds.
            log::info!("hi?");
            ws.on_upgrade(move |socket| player_connected(socket, games, 123))
        });

    let root = warp::fs::dir("../frontend/dist")
        .or(warp::fs::file("../frontend/dist/index.html"))
        .or(enter_game);

    let (_, server) = warp::serve(root)
        .bind_with_graceful_shutdown(server_properties.address, async move {
            tokio::signal::ctrl_c()
                .await
                .expect("failed to listen to a shutdown signal");
        });

    log::info!("Server is running at {}", server_properties.address);
    server.await;
    log::info!("Server was shut down");
}
