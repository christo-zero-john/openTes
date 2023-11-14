var qrData = document.getElementById("qrData");
var qrCode = document.getElementById("qrCode");
var advanced = document.getElementById("advanced");
var codeColor = "";

function generate() {
    qrCode.src = "";
    var data = qrData.value;  
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=1080x750&color=0-0-0&format=png&ecc=H&margin=10`;
        console.log("QR code Generated");
    }
