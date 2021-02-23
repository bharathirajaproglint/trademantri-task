#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */
import App from './main';
import http from 'http';

App.set('port', 8080);

/**
 * Create HTTP & HTTPS server.
 */
const HttpServer = http.createServer(App);

/**
 * Listen on provided port, on all network interfaces.
 */
HttpServer.listen(8080);
HttpServer.on('error', onError);
HttpServer.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = HttpServer.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.info('Listening on ' + bind);
}

