var jsSHA = require("jssha");
var { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const request = require('request');
const User = require('./models/user.model.js')
dotenv.config();

exports.payUMoneyPayment = function (req, res) {


    if (!req.body.data.txnid || !req.body.data.amount || !req.body.data.productinfo
        || !req.body.data.firstname || !req.body.data.email) {
        res.send("Mandatory fields missing");
    }
    else {

        const cross = async () => {

            var user = await User.findById(req.body.data.udf1);
            if (req.body.data.txnid === 'new_account') {
                var money = req.body.data.udf2;
            } else {
                var money = user.cart;
            }
            var num = process.env.value;
            var string = '';

            for (let i = 0; i < money.length; i++) {
                if (money[i].name === 'elev') {
                    num = parseInt(num) + parseInt(process.env.elev);
                    string = string + 'isro'
                }
                else if (money[i].name === 'twel') {
                    num = parseInt(num) + parseInt(process.env.twel);
                    string = string + 'tata'
                }
                else if (money[i].name === '2023CC') {
                    num = parseInt(num) + parseInt(process.env.combo);
                    string = string + 'drdo'
                }
                else if (money[i].name === 'personal1') {
                    num = parseInt(num) + parseInt(process.env.personal1);
                    string = string + 'bel1'
                }
                else if (money[i].name === 'personal2') {
                    num = parseInt(num) + parseInt(process.env.personal2);
                    string = string + 'bel2'
                }
                else if (money[i].name === 'personal3') {
                    num = parseInt(num) + parseInt(process.env.personal3);
                    string = string + 'bel3'
                }
                else if (money[i].name === 'material') {
                    num = parseInt(num) + parseInt(process.env.material);
                    string = string + 'bros'
                }
            }
            var pd = req.body.data;
            var otpi = Math.floor(1000000 + Math.random() * 9000000);
            await User.findByIdAndUpdate(req.body.data.udf1, { pkey: otpi })
            pd.udf3 = otpi;
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
            pd.surl = 'https://api.rankboost.live/payu/success';
            pd.furl = 'https://api.rankboost.live/payu/failed';

            request.post( {
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
                    res.json({ status: 'body' })
                } else if (httpRes.statusCode >= 300 &&
                    httpRes.statusCode <= 400) {
                    res.json({ status: 'link', link: httpRes.headers.location.toString() });
                }
            })
        }
        cross()
    }
}

// https://api.payu.in/public/#/ee2ff02ab7daea51eaa20504d7cf79ee