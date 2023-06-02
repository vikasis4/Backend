var express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');
var ccavReqHandler = require('./ccavRequestHandler.js');
var ccavResHandler = require('./ccavResponseHandler.js');
const {products} = require('../middleware/products.js');

var app = express();
app.set('view engine', 'ejs');

const url = 'mongodb://127.0.0.1:27017/paceway?readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh+1.5.0&directConnection=true&ssl=false'
mongoose.set("strictQuery", false);
const mongoToConnect = async ()=>{
     await mongoose.connect(url, ()=> {
        console.log('Connected to MOngoDB');
    })
}
mongoToConnect();


app.get('/pay/:id/', async function (req, res) {

    const { id } = req.params;
    var user = await User.findById(id);
    var money = 0
    var string = "";
    var names = [];
    var price = [];

    for (let i = 0; i < user.cart.length; i++) {
        var ans = products.filter((value) => value.code === user.cart[i].code);
        if (ans.length === 0) { null }
        else {
            string = string + ans[0].code.toString();
            money = money + ans[0].price;
            names.push(ans[0].name)
            price.push(ans[0].price)
        }
    }
    var uid = uuidv4();
    res.render('dataFrom', { id, string, uid, money, names, price });
});



app.post('/ccavRequestHandler', function (request, response) {
    ccavReqHandler.postReq(request, response);
});


app.post('/ccavResponseHandler', function (request, response) {
    ccavResHandler.postRes(request, response);
});

app.listen(3001);
