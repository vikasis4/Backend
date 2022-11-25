var jsSHA = require("jssha");
var { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const request = require('request')
dotenv.config();


exports.payUMoneyPayment = function (req, res) {


    if (!req.body.data.txnid || !req.body.data.amount || !req.body.data.productinfo
        || !req.body.data.firstname || !req.body.data.email) {
        res.send("Mandatory fields missing");
    } else {
        var pd = req.body.data;
        pd.txnid = uuidv4();
        var hashString = process.env.payukey // Merchant Key 
            + '|' + pd.txnid
            + '|' + pd.amount
            + '|' + pd.productinfo
            + '|' + pd.firstname
            + '|' + pd.email
            + '|' + '||||||||||'
            + process.env.payusalt // Your salt value
        var sha = new jsSHA('SHA-512', "TEXT");
        sha.update(hashString)
        var hash = sha.getHash("HEX");
        pd.hash = hash;
        pd.key = process.env.payukey;
        pd.surl = 'http://localhost:4000/payu/success';
        pd.furl = 'http://localhost:3000/payu/failed';

        request.post({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'https://secure.payu.in/_payment', //Testing url
            form: pd
        }, function (error, httpRes, body) {
            if (error)
                res.send(
                    {
                        status: false,
                        message: error.toString()
                    }
                );
            if (httpRes.statusCode === 200) {
                res.send(body);
                res.json({status : 'body'})
            } else if (httpRes.statusCode >= 300 &&
                httpRes.statusCode <= 400) {
                res.json({status: 'link', link:httpRes.headers.location.toString()});
            }
        })
    }
}