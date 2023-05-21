const https = require('https');

const PaytmChecksum = require('./PaytmChecksum');

var paytmParams = {};

paytmParams.body = {
    "requestType": "Payment",
    "mid": "JxXFGe52645016085987",
    "websiteName": "DEFAULT",
    "orderId": "ORDERID_3",
    "callbackUrl": "https://ser-vnqc.onrender.com/pay",
    "txnAmount": {
        "value": "1.00",
        "currency": "INR",
    },
    "userInfo": {
        "custId": "CUST_002",
    },
};


PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "JiIPhhBn@G&y#w_&").then(function (checksum) {

    paytmParams.head = {
        "signature": checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        // hostname: 'securegw-stage.paytm.in',

        /* for Production */
        hostname: 'securegw.paytm.in',

        port: 443,
        path: '/theia/api/v1/initiateTransaction?mid=JxXFGe52645016085987&orderId=ORDERID_3',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function (post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function () {
            console.log('Response: ', response);
        });
    });

    post_req.write(post_data);
    post_req.end();
});
