'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const app = require('../src/app');

const port = normalizaPort(process.env.PORT || '3000'); // funciona com 3000 e com '3000'.

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizaPort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    };

    if (port >= 0) {
        return port;        
    };

    return false;
};

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    };

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    
    switch (error.code) {
        case 'EACCESS': // erro de permissão
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': // erro de endereço em uso
            console.error(bind + ' is alrealy in use');
            process.exit(1);
            break;
        default:
            throw error;
    };
};

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
