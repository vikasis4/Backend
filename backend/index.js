const express = require('express');
const cors = require('cors');
const mongoToConnect = require('./mongodb')
const dotenv = require('dotenv');
const path = require("path");
const { UPDATE_mentorId } = require('./middleware/updateMongoos')

const { execute } = require('./CCavenue/activate')
///////////////// IMPORT SCHEMAS FOR MONGOOSE UPDATE ///////////////////////////
const User = require('./models/user.model')
// UPDATE_mentorId()



//////////////// IMPORTANT BACKGROUND PROCESSES //////////////////////////////////
const mails = require('./middleware/mails')
const job1 = require('./cronjobs/saveDB')
const job2 = require('./cronjobs/reset_mentor')
const firebaseMessages = require('./middleware/firebaseMessage')
//////////////// ROUTES DECLARATION ///////////////////////////////////////////////
const auth_routes = require('./routes/auth')
const pay_routes = require('./routes/payment')
const products_routes = require('./routes/products')
const mentor_routes = require('./routes/mentor')
const cart_routes = require('./routes/cart')
const fcm_routes = require('./routes/fcm')
const chat_routes = require('./routes/chat')
const material_routes = require('./routes/material')


/////////////////////////// INITIALIZE /////////////////////////////
const app = express();
app.use(require('express-status-monitor')());
const server = require('http').createServer(app);
mongoToConnect();
dotenv.config();
const DevMode = process.env.DevMode;
app.use(DevMode === 'development' ? cors('*') : cors({ origin: ['https://rankboost.live', 'https://pay.rankboost.live', 'https://admin.rankboost.live', 'https://api.payu.in/'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var make = path.join(__dirname, 'public');
app.use(express.static(make));

var ccavResponse= "order_id=3ef592b0-6ab0-445d-b205-4cbba0bdad7f&tracking_id=112901988523&bank_ref_no=20230606011060000872799635419612198&order_status=Success&failure_message=&payment_mode=Wallet&card_name=Paytm&status_code=null&status_message=Txn Success&currency=INR&amount=1.00&billing_name=Rankboost&billing_address=Rankboost gurugram office&billing_city=gurugram&billing_state=Haryana&billing_zip=133001&billing_country=India&billing_tel=8307067006&billing_email=contact@rankboost.live&delivery_name=Rankboost&delivery_address=RankBoost gugram office&delivery_city=Gurugram&delivery_state=Haryana&delivery_zip=133001&delivery_country=India&delivery_tel=8307067006&merchant_param1=643ac4d9758a1e729ce910b3&merchant_param2=7988&merchant_param3=&merchant_param4=additional Info&merchant_param5=additional Info&vault=N&offer_type=null&offer_code=null&discount_value=0.0&mer_amount=1.00&eci_value=null&retry=N&response_code=0&billing_notes=&trans_date=06/06/2023 11:14:08&bin_country="
const axios = require('axios');
const run = async () => {
    await axios.post('http://localhost:4000/api/pay/handle', { str: ccavResponse }).then(function (response) {
        if (response.data.success) {
            response.json('ccavResponse')
        } else {
            console.log('failed');
            // response.json({ Msg: 'Payment Failed, If Money is deducted contact customer support' })
        }
    })
}
run()

////////////////// ROUTES //////////////////////////////////////////////////////////
app.use('/api/auth', auth_routes)
app.use('/api/pay', pay_routes)
app.use('/api/product', products_routes)
app.use('/api/mentor', mentor_routes)
app.use('/api/cart', cart_routes)
app.use('/api/fcm', fcm_routes)
app.use('/api/chat', chat_routes)
app.use('/api/material', material_routes)
app.get('/', async (req, res) => {
    res.json({ success: true })
})


server.listen(process.env.PORT || 4000, function () {
    console.log("server is running on port: 4000");
});