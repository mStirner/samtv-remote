const crypto = require('crypto');

// Copied from https://gist.github.com/siwalikm/8311cf0a287b98ef67c73c1b03b47154
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
const IV = "5183666c72eec9e4"; // set random initialisation vector
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');


var aesEncrypt = ((val, algo = "aes-256-cbc") => {
    let cipher = crypto.createCipheriv(algo, ENC_KEY, IV);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
});

var aesDecrypt = ((encrypted, algo = "aes-256-cbc") => {
    let decipher = crypto.createDecipheriv(algo, ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
});

function sha1(data) {
    let shasum = crypto.createHash('sha1');
    return shasum.update(data).digest('hex');
}


// helper functions end

const { wbKey, publicKey } = require("./keys.js");

function GenerateServerHello(data) {

    if (data.UserID.length <= 0 || data.UserID.length > 96) {
        throw new RangeError(`Invalid userId size`);
    }

    let exepectedLength = 10 + 1 + (4 + data.UserID.length + 128) + 5;


    let header = Buffer.from([0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00]);
    let footer = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]);

    aesEncrypt(sha1(data.PIN), "aes-256-cbc");

}


module.exports = {
    GenerateServerHello
};