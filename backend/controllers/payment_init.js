var jsSHA = require("jssha");
var { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const request = require('request');
const User = require('../models/user.model.js');
const {products} = require('../middleware/products.js');
dotenv.config();

const payment_init = async (req, res) => {

    try {

        const cross = async () => {
            var user = await User.findById(req.body.data.udf1);
            var pd = req.body.data;
            var num = 0;
            var string = '';
        
            for (let i = 0; i < user.cart.length; i++) {
                var ans = products.filter((value) => value.code === user.cart[i].code);
                if (ans.length === 0) { null }
                else {
                    string = string + ans[0].code.toString();
                    num = num + ans[0].price
                }
            }

            pd.udf2 = string;
            pd.txnid = uuidv4();
            pd.amount = num;
            var hashString = process.env.payukey // Merchant Key 
                + '|' + pd.txnid
                + '|' + pd.amount
                + '|' + pd.productinfo
                + '|' + pd.firstname
                + '|' + pd.email
                + '|' + pd.udf1
                + '|' + pd.udf2
                + '|' + pd.udf3
                + '|' + '|||||||'
                + process.env.payusalt // Your salt value
            var sha = new jsSHA('SHA-512', "TEXT");
            sha.update(hashString)
            var hash = sha.getHash("HEX");
            pd.hash = hash;
            pd.key = process.env.payukey;
            // pd.surl = 'https://rankboost.vercel.app/api/success';
            // pd.furl = 'https://rankboost.vercel.app/api/failure';
            pd.surl = 'http://localhost:4000/api/pay/success';
            pd.furl = 'http://localhost:4000/api/pay/failure';

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
                    res.json({ status: 'body', body })
                } else if (httpRes.statusCode >= 300 &&
                    httpRes.statusCode <= 400) {
                    res.json({ status: 'link', link: httpRes.headers.location.toString() });
                }
            })
        }
        cross()
    } catch (error) {
        console.log(error);
    }

}

module.exports = payment_init