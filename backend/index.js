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