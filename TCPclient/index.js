"use strict";

let net = require("net");

let free = true;
let a = undefined;
let b = undefined;

const client = net.connect({port: 5000}, () => {
    console.log('CONNECT');

    client.on('end', function () {
        console.log('DISCONNECT');
    });

    client.on('data', function (data) {
        const answer = parseInt(data.toString());
        console.log("A: " + a + "  B: " + b + "  Ans: " + answer);
        if(a + b !== answer) throw new Error();
        free = true;
    });
});

function mainFunction() {
    if(free === true) {
        a = parseInt(Math.random() * 10000) % 150;
        b = parseInt(Math.random() * 10000) % 150;
        const s = JSON.stringify({
            a: a,
            b: b
        });
        free = false;
        client.write(s);
    }
}

let inter = setInterval(() => {
    try {
        mainFunction();
    } catch (err) {
        // err
    }
}, 1);
