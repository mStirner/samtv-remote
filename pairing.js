const request = require("./request.js");
const qs = require("querystring");

function openPinPage() {
    let req = request("http://192.168.2.100:8080/ws/apps/CloudPINPage", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    let data = qs.stringify({
        'data': 'pin4'
    });

    req.write(data);
}


function closePinPage() {
    let req = request("http://192.168.2.100:8080/ws/apps/CloudPINPage/run", {
        method: "DELETE"
    });
}


openPinPage();

setTimeout(closePinPage, 5000);