import axios from 'axios';

// ----------------------------------------------------------------------


function verifyQRCode(qrCodeContent) {
    const url = 'http://localhost:8080/auth/qrVerify';
    const dataPost = {
        qrCode: qrCodeContent,
    };

    axios.post(url, dataPost)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

const data = "$2b$10$veC9oLAPA5lbuPiuKDeFa.tS1t2otg9nTT6AdNj/lTpL6VXacS5VS"

verifyQRCode(data);