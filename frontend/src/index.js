import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

import './reset.css';
import './styles.css';

// import init, { greet } from '../wasm-lib';

// init().then(() => {
//     greet();
// });

// TODO: Add websocket support
const url = 'ws://' + location.host + '/game';
const ws = new WebSocket(url);
console.log(ws);

function message(data) {
    console.log(data);
}

ws.onopen = function () {
    console.log('Player connected!');
};

ws.onmessage = function (msg) {
    message(msg.data);
};

ws.onclose = function () {
    console.log('Player left!');
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
