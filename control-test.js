const WebSocket = require("ws");
const crypto = require("crypto");

const request = require("./request");
const UUID = "samtv";

// Wohnzimmer
const HOST = "192.168.2.100"
const SESSION_ID = "3"
const SESSION_KEY = Buffer.from("59e8ca4b09f2a19ab5421cf55d604c7c", "hex");

// Schlafzimmer
// nutzt {"type": "Buffer", "data": [...]}
// statt dem was "legacy" tv nutzt, Tizen/API version?!
//const HOST = "192.168.2.104";
//const SESSION_ID = "1";
//const SESSION_KEY = Buffer.from("31cfdcad85976291f786d7b96187d0fb", "hex");






var aesEncrypt = ((val, algo = "aes-128-ecb") => {
    let cipher = crypto.createCipheriv(algo, SESSION_KEY, null);
    return Buffer.concat([cipher.update(val, 'utf8'), cipher.final()]);
});


function handshakeComplete(ws) {

    let cmd = {
        "method": "POST",
        "body": {
            "plugin": "RemoteControl",
            "param1": `uuid:${UUID}`,
            "param2": "Click",
            "param3": "KEY_CHDOWN",
            "param4": false,
            "api": "SendRemoteKey",
            "version": "1.000"
        }
    };

    let aes = aesEncrypt(JSON.stringify(cmd));
    let body = [];

    for (let i = 0; i < aes.length; i++) {
        body.push(aes[i]);
    }

    //console.log("AES Encrypted body", body)


    // WOHNZIMMER WRAPPER
    let wrapper = {
        "name": "callCommon",
        "args": [{
            "Session_Id": +SESSION_ID,
            "body": `[${body.join(", ")}]`
        }]
    };


    /*
    let wrapper = {
        "name": "callCommon",
        "args": aes
    };
    */

    console.log("Wrapper", JSON.stringify(wrapper))

    setInterval(() => {

        let m = `5::/com.samsung.companion:${JSON.stringify(wrapper)}`;
        let o = `5::/com.samsung.companion:{"name":"callCommon","args":[{"Session_Id":3,"body":"[131, 254, 56, 23, 115, 213, 166, 153, 132, 35, 176, 123, 83, 140, 137, 180, 36, 118, 37, 110, 97, 7, 118, 44, 18, 21, 154, 181, 128, 62, 118, 95, 93, 162, 11, 211, 76, 82, 9, 26, 28, 77, 252, 174, 207, 242, 176, 119, 208, 160, 25, 30, 117, 38, 206, 121, 22, 159, 20, 199, 95, 204, 244, 81, 247, 150, 142, 225, 221, 170, 80, 47, 104, 187, 235, 183, 218, 11, 146, 197, 156, 93, 146, 210, 172, 123, 128, 235, 108, 211, 205, 21, 26, 144, 117, 17, 44, 196, 10, 238, 24, 177, 230, 116, 44, 204, 224, 73, 249, 213, 225, 19, 13, 58, 216, 41, 180, 48, 72, 249, 109, 110, 108, 215, 196, 179, 229, 39, 52, 44, 117, 61, 114, 169, 181, 174, 154, 161, 102, 4, 108, 7, 53, 7, 17, 135, 180, 85, 244, 247, 216, 81, 106, 134, 240, 113, 137, 149, 26, 36, 206, 83, 129, 249, 20, 17, 225, 178, 200, 143, 227, 235, 58, 56, 173, 22]"}]}`;

        console.log("Send command", m);

        ws.send(m);
        //ws.send(`5::/com.samsung.companion:{"name":"callCommon","args":[{"Session_Id":3,"body":"[131, 254, 56, 23, 115, 213, 166, 153, 132, 35, 176, 123, 83, 140, 137, 180, 36, 118, 37, 110, 97, 7, 118, 44, 18, 21, 154, 181, 128, 62, 118, 95, 93, 162, 11, 211, 76, 82, 9, 26, 28, 77, 252, 174, 207, 242, 176, 119, 208, 160, 25, 30, 117, 38, 206, 121, 22, 159, 20, 199, 95, 204, 244, 81, 247, 150, 142, 225, 221, 170, 80, 47, 104, 187, 235, 183, 218, 11, 146, 197, 156, 93, 146, 210, 172, 123, 128, 235, 108, 211, 205, 21, 26, 144, 117, 17, 44, 196, 10, 238, 24, 177, 230, 116, 44, 204, 224, 73, 249, 213, 225, 19, 13, 58, 216, 41, 180, 48, 72, 249, 109, 110, 108, 215, 196, 179, 229, 39, 52, 44, 117, 61, 114, 169, 181, 174, 154, 161, 102, 4, 108, 7, 53, 7, 17, 135, 180, 85, 244, 247, 216, 81, 106, 134, 240, 113, 137, 149, 26, 36, 206, 83, 129, 249, 20, 17, 225, 178, 200, 143, 227, 235, 58, 56, 173, 22]"}]}`)

        console.log("Compared", o == m);


    }, 1000);

}


request(`http://${HOST}:8000/socket.io/1/?t=${Date.now()}`, (err, result) => {
    if (err) {

        console.error(err);
        process.exit(1);

    } else {

        let start = null;
        let wsp = result.body.toString().split(":")[0];

        let ws = new WebSocket(`ws://${HOST}:8000/socket.io/1/websocket/${wsp}`);

        ws.on("close", () => {
            console.log("Disconnected from ", ws.url, "Duration: ", Date.now() - start);
        });

        ws.on("open", () => {
            console.log("Connected to ", ws.url);
        });

        ws.on("message", (msg) => {

            let str = msg.toString();
            console.log("MSG >", str)

            if (str === "1::") {

                // received greeings from tv
                // send hello
                console.log("Received greeting from tv");
                // TODO SEND HERE SMARTVIEW HANDSHAKE
                ws.send("1::/com.samsung.companion");

            } else if (str === "1::/com.samsung.companion") {

                // received hello from tv
                // handshake completed
                console.log("Handshake complete");
                start = Date.now();
                handshakeComplete(ws);

            } else if (str === "2::") {

                // received keep alive from tv
                // send keep alive to tv
                console.log("Received keep alive from tv");
                ws.send("2::");

            } else {

                console.log("str", str);

            }



        });

    }
});