use std::{collections::HashMap, fs, net::SocketAddr, path::Path, str::FromStr};
use warp::Filter;


#[macro_use]
extern crate dotenv_codegen;


#[derive(Debug)]
struct ServerProperties {
    address: SocketAddr,
}

fn get_server_properties() -> Result<ServerProperties, Box<dyn std::error::Error>> {
    let ip = dotenv!("HOST");
    let port= dotenv!("PORT");

    env_logger::builder()
        .filter_level(log::LevelFilter::from_str(dotenv!("RUST_LOG"))?)
        .format_timestamp(None)
        .format_target(false)
        .init();


    let address: SocketAddr = format!("{ip}:{port}").parse::<SocketAddr>().unwrap_or_else(move |err| {
        eprintln!("error: {err}: {ip}:{port}");
        "127.0.0.1:8000".parse().unwrap()
    });

    Ok(ServerProperties {
        address
    })
}


#[tokio::main]
async fn main() {
    let server_properties = get_server_properties().expect("Could not set up the server");
    
    let root = warp::fs::dir("../frontend/dist")
        .or(warp::fs::file("../frontend/dist/index.html"));

    let (_, server) = warp::serve(root)
        .bind_with_graceful_shutdown(server_properties.address, async move {
            tokio::signal::ctrl_c()
                .await
                .expect("failed to listen to shutdown signal");
        });
    
    server.await;
    
    log::info!("Server was shut down");
}