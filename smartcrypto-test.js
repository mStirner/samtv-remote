const { GenerateServerHello } = require("./smartcrypto.js");

let hello = GenerateServerHello({
    UserID: "654321",
    PIN: "1234"
});

console.log("ServerHello", hello)



const {
    getCiphers
} = require('node:crypto');

console.log(getCiphers()); // ['aes-128-cbc', 'aes-128-ccm', ...]