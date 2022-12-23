const crypto = require("crypto");

const SESSION_KEY = Buffer.from("59e8ca4b09f2a19ab5421cf55d604c7c", "hex");

var aesEncrypt = ((val, algo = "aes-128-ecb") => {
    let cipher = crypto.createCipheriv(algo, SESSION_KEY, null);
    return Buffer.concat([cipher.update(val, 'utf8'), cipher.final()]);
});

var ciphertext = aesEncrypt("The quick brown fox jumps over the lazy dog");
console.log(ciphertext.toString('hex'))