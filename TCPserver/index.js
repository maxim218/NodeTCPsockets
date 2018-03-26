"use strict";

let net = require("net");

let server = net.createServer((connection) => {
    console.log('CONNECT');

    connection.on('end', function() {
        console.log('DISCONNECT');
    });

    connection.on('data', (data) => {
        const body = JSON.parse(data.toString());
        const a = parseInt(body.a);
        const b = parseInt(body.b);
        const result = a + b;
        console.log("A: " + a + "  B: " + b + "  Res: " + result);
        connection.write(result.toString());
    });
});

const portNumber = 5000;

server.listen(portNumber, () => {
    console.log("Server port: " + portNumber);
    console.log("------------------------------------");
});
