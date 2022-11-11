const express = require('express');
const cors = require('cors');
const User = require('./models/user.model')
const Video = require('./models/video')
const mongoToConnect = require('./mongodb')
const bcrypt = require('bcryptjs');
const verify = require('./middleware/verify')
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Otp = require('./models/otp');
const Payment = require('./models/payment');
const Pdf = require('./models/pdf');
const fs = require("fs").promises;
const path = require("path");
const handlebars = require("handlebars");
const tempotp = "./templates/otp.html";
const temprefralpaid = "./templates/refralPaid.html";
const temppass = "./templates/password.html";
const tempmsg = "./templates/message.html";
const tempacc = "./templates/account.html";
const Query = require("./models/query");
const multer = require("multer");
const Refral = require('./models/refral');
const reffile = require("./refralfile");
const live = require("./live");
const Live = require('./models/live');
const History = require('./models/traffichistory');
const { v4: uuidv4 } = require('uuid');
const Personal = require('./models/personal');
const Pyq = require('./models/pyq');
const Variables = require('./models/variables');
const { spawn } = require('child_process');
var CronJob = require('cron').CronJob;


const app = express();
const server = require('http').createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*"
//     }
// });
const io = require("socket.io")(server, {
    cors: {
        origin: ['https://rankboost.live', 'https://admin.rankboost.live']
    }
});
////////////////////////////////////////////////////////////////////////////
const DB_name = 'paceway';
const Archive_path = path.join(__dirname, 'backup', `${DB_name}.gzip`)
const backupDB = () => {
    spawn('mongodump', [
        `--db=${DB_name}`,
        `--archive=${Archive_path}`,
        '--gzip'
    ])
}
var job1 = new CronJob(
    '0 1 * * *',
    function () {
        backupDB()
    },
    null,
    true
);
/////////////////////////////////////////////////////////////////////////////////////////

mongoToConnect();
dotenv.config();
app.use(cors({ origin:['https://rankboost.live', 'https://admin.rankboost.live'], credentials: true}));
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var make = path.join(__dirname, 'public');
app.use(express.static(make));




///////////////////////////////////////////////////////////////////////////////////////////////////////////

const asp = io.of("/admin");
const nsp = io.of("/normal");
var count = 0;
var livearray = [];
asp.on("connection", (socket) => {

    socket.on("Texts", (data) => {
        nsp.to(data.connection).emit("data", data);
    })
    /////////////////////////////////////

})

nsp.on("connection", (socket) => {
    socket.on('update-cont', (id) => {
        count = count + 1;
        if (id) {
            livearray.push(id);
        }
        asp.emit("live-listen", count);
    })
    socket.on("disconnect", () => {
        const index = livearray.findIndex((element) => element === socket.id);
        if (index > -1) {
            count = count - 1;
            livearray.splice(index, 1);
        }
        asp.emit("live-listen", count);
    })
    /////////////////////////////////////
    socket.on('Texts', (data) => {
        asp.emit('daata', data);
    })
    socket.on("join-room", (room) => {
        socket.join(room)
    })
})
///////////////// LIVE RELOADER /////////////////////////////////////////////////////////////////////////////
var job2 = new CronJob(
    '* * * * *',
    function () {
        live()
    },
    null,
    true
);
//////////////// TRAFFIC MANAGER ///////////////////////////////////////////////////////////////////////////
app.post('/api/traffic/tracker', async (req, res) => {
    const ds = new Date();
    const day = ds.getUTCDate();
    const month = ds.getUTCMonth() + 1;
    const year = ds.getUTCFullYear();
    try {
        const live = await Live.findOne({ username: req.body.livetoken });
        if (live) {
            if (live.status === 'offline') {
                await History.create({
                    day,
                    month,
                    year
                })
            }
            await Live.findOneAndUpdate({ username: req.body.livetoken }, {
                time: req.body.sum,
                status: "online"
            })
        } else {
            await Live.create({
                register: req.body.type,
                username: req.body.livetoken,
                status: "online",
                time: req.body.sum
            })
            await History.create({
                day,
                month,
                year
            })
        }
    } catch (error) {
        console.log(error);
    }
    res.status(200).send({ work: 'yes' })
})
app.get('/api/get/traffic', async (req, res) => {
    try {
        await Live.find({}).then(function (data) {
            res.json(data)
        })
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/history/traffic', async (req, res) => {
    try {
        await History.find({}).then(function (data) {
            res.json(data)
        })
    } catch (error) {
        console.log(error);
    }
})
//////////////////////////////// MONEY WITHDRAW ////////////////////////////////////////////////////////

app.post('/api/withdraw/refral/money', async (req, res) => {
    try {
        reffile("withdraw", req.body.id)
        res.json({ status: 'success' })
    } catch (error) {
        console.log(error);
    }
})
////////////////////////////// MONEY PAID /////////////////////////////////////////////////////////////

app.post('/api/benjo/paid', async (req, res) => {
    try {
        const money = req.body.money;
        const id = req.body.money;

        reffile("paid", req.body.id)
        res.json({ status: 'yes' })
        refralpaidfxn({ money, id })
    } catch (error) {
        console.log(error);
    }
})

///////////////////// USER /////////////////////////////////////////////////////////////////////////////

app.get('/api/userswill/info', async (req, res) => {
    try {
        await User.find({}).then(function (data) {
            res.json(data)
        })
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/check/live', async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        if (user) {
            const live = await Live.findOne({ username: user.username });
            res.json(live)
        }
    } catch (error) {
        console.log(error);
    }

})

//////////////   REGISTER    /////////////////////////////////////////////////////////////////////////////

app.post('/api/register', async (req, res) => {

    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if (user && user.otp === false) {
            var otpi = Math.floor(1000 + Math.random() * 9000);
            var cred = {
                otp: otpi,
                mail: user.username
            }
            otpFxn(cred)

            try {
                const valor = await Otp.create({
                    "id": user._id,
                    "otp": otpi
                })
                res.json({ otp: 'sent', id: user._id });
            } catch (error) {
                console.log(error);
            }

        }
        else if (user && user.otp === true) {
            res.json({ message: 'no' });
        }
        else if (user && req.body.type === 'google') {
            res.json({ message: 'no' })
        }
        else if (req.body.type === 'google') {
            const vref = await Refral.findOne({ userid: req.body.refral })
            if (vref) {
                const user = await User.create({
                    username: req.body.username,
                    password: req.body.password,
                    img: req.body.img,
                    otp: true,
                    refral: req.body.refral,
                    name: req.body.namee,
                    room: uuidv4()
                })
                const token = await user.generateToken();
                user.save()
                res.json({ message: "yup", token });

                var cred = {
                    pass: req.body.password,
                    email: user.username
                }
                passFxn(cred);
                reffile("account", req.body.username, req.body.refral)
            } else {
                const user = await User.create({
                    username: req.body.username,
                    password: req.body.password,
                    img: req.body.img,
                    otp: true,
                    refral: "empty",
                    room: uuidv4()
                })
                const token = await user.generateToken();
                user.save()
                res.json({ message: "yup", token });

                var cred = {
                    pass: req.body.password,
                    email: user.username
                }
                passFxn(cred);
                reffile("account", req.body.username, req.body.refral)
            }
        }
        else {
            try {
                const vref = await Refral.findOne({ userid: req.body.refral })
                if (vref) {
                    const user = await User.create({
                        username: req.body.username,
                        password: req.body.password,
                        refral: req.body.refral,
                        name: req.body.namee,
                        room: uuidv4()
                    })
                    user.save();
                    var otpi = Math.floor(1000 + Math.random() * 9000);
                    var cred = {
                        otp: otpi,
                        mail: req.body.username
                    }
                    otpFxn(cred);
                    reffile("account", req.body.username, req.body.refral)
                    try {
                        const valor = await Otp.create({
                            "id": user._id,
                            "otp": otpi
                        })
                        res.json({ otp: 'sent', id: user._id });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    const user = await User.create({
                        username: req.body.username,
                        password: req.body.password,
                        refral: "empty",
                        name: req.body.namee,
                        room: uuidv4()
                    })
                    user.save();
                    var otpi = Math.floor(1000 + Math.random() * 9000);
                    var cred = {
                        otp: otpi,
                        mail: req.body.username
                    }
                    otpFxn(cred);
                    reffile("account", req.body.username, req.body.refral)
                    try {
                        const valor = await Otp.create({
                            "id": user._id,
                            "otp": otpi
                        })
                        res.json({ otp: 'sent', id: user._id });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            catch (error) {
                res.json({ status: "shit goes crazy" });
            }
        }
    }
    catch (error) {
        res.json({ status: "shit goes crazy, while registering" });
    }


})
///////////////////////////// VERIFY OTP /////////////////////////////////////////////////////

app.post('/api/otp', async (req, res) => {


    try {

        const tkn = await Otp.findOne({ id: req.body.id });
        const user = await User.findById(req.body.id);

        if (tkn.otp === req.body.otp && req.body.blink === 69) {

            var otpi = Math.floor(1000 + Math.random() * 9000);

            await User.findByIdAndUpdate(req.body.id, { otp: 'true' }, { upsert: true, usefindandmodify: false })
            await User.findByIdAndUpdate(req.body.id, { code: otpi }, { upsert: true, usefindandmodify: false })
            await Otp.findOneAndDelete({ id: req.body.id })

            res.json({ message: "yes", norm: otpi });
        }
        else if (tkn.otp === req.body.otp && req.body.blink === 90) {
            const doc = await User.findByIdAndUpdate(req.body.id, { otp: 'true' }, { upsert: true, usefindandmodify: false })
            const token = await user.generateToken();
            user.save()
            accFxn(user.username)
            const vele = await Otp.findOneAndDelete({ id: req.body.id })
            res.json({ message: "yes", token });

        } else {
            console.log('jumla');
            res.json({ message: "no" })
        }
    } catch (error) {
        res.json({ message: "fail" })
    }

})

////////////////////////// RESEND OTP //////////////////////////////////////////////////////

app.post('/api/endverify', async (req, res) => {


    try {
        var user;
        var ui = '';

        if (req.body.username) {
            user = await User.findOne({ username: req.body.username })
        } else {
            user = await User.findById(req.body.id);
            const memo = await Otp.findOne({ id: req.body.id });
            if (user) {
                ui = 'yes'
            }
        }

        if (ui === 'yes') {
            const looser = await User.findById(req.body.id);
            await Otp.findOneAndRemove({ id: req.body.id })
                .then(async (looser) => {
                    console.log(looser);
                    const vele = await Otp.findOneAndDelete({ id: user._id })
                    var otpi = Math.floor(1000 + Math.random() * 9000);
                    var cred = {
                        otp: otpi,
                        mail: user.username
                    }
                    otpFxn(cred)
                    try {
                        await Otp.create({
                            "id": user._id,
                            "otp": otpi
                        })
                        res.json({ otp: 'sent', id: user._id });
                    } catch (error) {
                        console.log(error);
                    }
                })
        }

        else {
            const go = async (user) => {

                var findotp = await Otp.findOne({ id: user._id })
                if (findotp) {
                    const vele = await Otp.findOneAndDelete({ id: user._id })
                }

                var otpi = Math.floor(1000 + Math.random() * 9000);
                var cred = {
                    otp: otpi,
                    mail: user.username
                }
                otpFxn(cred)
                try {
                    const valor = await Otp.create({
                        "id": user._id,
                        "otp": otpi
                    })
                    res.json({ otp: 'sent', id: user._id });
                } catch (error) {
                    console.log(error);
                }
            }

            if (user) {
                go(user);
            } else {
                res.json({ otp: 'nouser' })
            }

        }
    } catch (error) {
        res.json({ otp: 'fail' })
    }

})
//////////////   LOGIN    /////////////////////////////////////////////////////////////////////////////
app.post('/api/login', async (req, res) => {

    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if (user && user.otp === false) {
            res.json({ val: 'none' })
        }
        else if (user && req.body.type === 'google') {
            if (user.tokens.length === 2) {
                var arr = user.tokens;
                arr.shift();
                const token = await user.generateToken();
                res.json({ status: 'yes', token });
            }
            else {
                const token = await user.generateToken();
                res.json({ status: 'yes', token });
            }
        }
        else if (user && user.otp === true) {
            const passwordConfirm = req.body.password;
            const value = await bcrypt.compare(passwordConfirm, user.password);
            if (value) {
                if (user.tokens.length === 2) {
                    var arr = user.tokens;
                    arr.shift();
                    const token = await user.generateToken();
                    res.json({ status: 'yes', token });
                }
                else {
                    const token = await user.generateToken();
                    res.json({ status: 'yes', token });
                }
            } else {
                res.json({ status: 'no' });
            }
        }
        else { res.json({ message: "shit goes crazy, user not found", status: 'no' }); }
    } catch (error) {
        res.json({ status: "shit goes crazy, user didn't exist" });
    }
})

//////////////////////////////////// CHANGE PASSWORD ///////////////////////////////////////

app.post('/api/changepassword', async (req, res) => {

    const user = await User.findById(req.body.id);

    const control = req.body.code;
    var arr = user.tokens;

    if (user.code === control && control.toString().length === 4) {
        npassword = await bcrypt.hash(req.body.password, 10);
        const doc = await User.findByIdAndUpdate(req.body.id, { password: npassword }, { upsert: true, usefindandmodify: false })
        arr.shift();
        const token = await user.generateToken();

        res.json({ status: 'yes', token });
    } else {
        res.json({ status: 'not allowed' })
    }
    const lol = await User.findByIdAndUpdate(req.body.id, { code: 1 }, { upsert: true, usefindandmodify: false })



})
///////////////////////////// MAIL TEMPLATE /////////////////////////////////////////////////////////////

const messageFxn = async (cred) => {
    const templatemsg = path.join(__dirname, tempmsg);
    const templateFilemsg = await fs.readFile(templatemsg, 'utf-8');
    const msgtemplate = handlebars.compile(templateFilemsg);
    const accreplacement = {
        password: 'no need'
    };

    const msgHtml = msgtemplate(accreplacement);
    var mailOptions = {
        from: process.env.email_id,
        to: cred,
        subject: 'New message recived',
        html: msgHtml
    }
    optverify(mailOptions)
}

//////////////////////////////
const otpFxn = async (cred) => {
    const templateotp = path.join(__dirname, tempotp);
    const templateFileotp = await fs.readFile(templateotp, 'utf-8');
    const otptemplate = handlebars.compile(templateFileotp);
    const otpreplacement = {
        otp: cred.otp
    }

    const otpHtml = otptemplate(otpreplacement);
    var mailOptions = {
        from: process.env.email_id,
        to: cred.mail,
        subject: 'Rank Boost OTP Verification',
        html: otpHtml
    }
    optverify(mailOptions)
}
/////////////////
const refralpaidfxn = async (cred) => {
    const templateotp = path.join(__dirname, temprefralpaid);
    const templateFileotp = await fs.readFile(templateotp, 'utf-8');
    const otptemplate = handlebars.compile(templateFileotp);
    const otpreplacement = {
        money: cred.money
    }
    const otpHtml = otptemplate(otpreplacement);
    var mailOptions = {
        from: process.env.email_id,
        to: cred.mail,
        subject: 'Rank Boost OTP Verification',
        html: otpHtml
    }
    optverify(mailOptions)
}
/////////////////
const passFxn = async (cred) => {
    const templatepass = path.join(__dirname, temppass);
    const templateFilepass = await fs.readFile(templatepass, 'utf-8');
    const passtemplate = handlebars.compile(templateFilepass);
    const passreplacement = {
        password: cred.pass
    };
    const passHtml = passtemplate(passreplacement);
    var mailOptions = {
        from: process.env.email_id,
        to: cred.email,
        subject: 'Rank Boost ACCOUNT PASSWORD',
        html: passHtml
    }
    optverify(mailOptions)
}
/////////////////
const accFxn = async (mail) => {
    const templateacc = path.join(__dirname, tempacc);
    const templateFileacc = await fs.readFile(templateacc, 'utf-8');
    const acctemplate = handlebars.compile(templateFileacc);
    const accreplacement = {
        password: 'no need'
    };
    const accHtml = acctemplate(accreplacement);
    var mailOptions = {
        from: process.env.email_id,
        to: mail,
        subject: 'Rank Boost ACCOUNT CREATED SUCCESSFULLY',
        html: accHtml
    }
    optverify(mailOptions)
}

/////////////////////////////////// NODE MAIL HANDLER //////////////////////////////////////

var transpoter = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.email_id,
        pass: process.env.email_pass
    },
    port: 2525,
    tls: {
        rejectUnauthorized: false
    }
})
///////////////////////
transpoter.verify(function (err, res) {
    if (err) {
        console.log('connection failed');
    }
    else {
        console.log('Email services are Live');
    }
})
/////////////////////
const optverify = (mailOptions) => {

    transpoter.sendMail(mailOptions, function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent');
        }
        return true
    })
}


/////////////////////////////////// VERIFY USER JWT //////////////////////////////////////

app.get('/api/verifyuser', verify, async (req, res) => {

})

//////////////////////////////////  RAZOR PAY  /////////////////////////////////////////////

app.post('/api/payment/orders', async (req, res) => {

    try {
        var num = process.env.value;
        const user = await User.findById(req.body.id);
        const money = user.cart;
        for (let i = 0; i < money.length; i++) {
            if (money[i].name === 'elev') {
                num = parseInt(num) + parseInt(process.env.elev);
            }
            else if (money[i].name === 'twel') {
                num = parseInt(num) + parseInt(process.env.twel);
            }
            else if (money[i].name === 'combo') {
                num = parseInt(num) + parseInt(process.env.combo);
            }
            else if (money[i].name === 'personal') {
                num = parseInt(num) + parseInt(process.env.personal);
            }
            else if (money[i].name === 'material') {
                num = parseInt(num) + parseInt(process.env.material);
            }
        }
        const instance = new Razorpay({
            key_id: process.env.razorpaykey_id,
            key_secret: process.env.razorpaykey_secret
        });
        const options = {
            amount: num * 100,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex')
        }

        instance.orders.create(options, (error, orders) => {
            if (error) {
                console.log(error)
                res.json({ error, message: 'INTERNAL SERVER ERROR' })
                console.log('460:error');
            }
            else {
                res.json(orders)
            }
        })
    } catch (error) {
        console.log(error);
        console.log('468:error');
    }
})

app.post('/api/payment/verify', async (req, res) => {


    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, id, type, cart } = req.body

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.razorpaykey_secret)
            .update(sign.toString())
            .digest('hex');

        const payment = await Payment.create({
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            user: id,
            date: Date.now(),
            type: type,
            cart
        })
        payment.save();
        if (razorpay_signature === expectedSign) {
            reffile("payment", id, "NoToken", cart)
            var otpi = Math.floor(1000000 + Math.random() * 9000000);
            await User.findByIdAndUpdate(id, { pkey: otpi })
            return res.status(200).json({ message: "Payment verified Successfully", status: 'success', pkey: otpi });
        } else {
            return res.status(400).json({ message: "Payment verification failed", status: 'failed' });
        }

    } catch (error) {
        console.log(error);
    }
})

////////////////////// UPDATE USER SUBS ///////////////////////////////////

app.put('/api/updatesubs', async (req, res) => {

    try {
        const user = await User.findById(req.body.id);
        const volume = user.cart;
        var bools = 'false'

        if (volume.find(({ name }) => name === 'personal')) {
            bools = 'true'
        }

        const ds = new Date();
        const date = ds.getUTCDate(); //day
        const month = ds.getUTCMonth() + 1;
        const year = ds.getUTCFullYear();
        const hours = ds.getHours();
        const mins = ds.getMinutes();

        if (user.pkey === req.body.pkey) {
            if (user.subscription === 'true') {
                ////////////////////////
            } else {
                await User.findOneAndUpdate({ _id: req.body.id }, { subscription: 'true' })
            }
            if (volume.find(({ name }) => name === 'combo' || volume.find(({ name }) => name === 'personal'))) {

                try {
                    const chat = await Personal.findOne({ userid: req.body.id });
                    var diag = chat.dialogue;
                    diag.push({
                        statement: 'Your personal 1-1 guidance programme tenure is increased by 6 months',
                        type: 'vikas',
                        content: 'text',
                        mins,
                        hours,
                        date,
                        month,
                        year
                    })
                    await Personal.findOneAndUpdate({ userid: req.body.id }, { dialogue: diag })
                } catch (error) {
                    await Personal.create({
                        dialogue: [
                            {
                                statement: 'Welcome to rankboost personal 1-1 guidance programme. you can ask your all problems in your jee journey. Our team will respond to your questions within 1-2 days',
                                type: 'vikas',
                                content: 'text',
                                mins,
                                hours,
                                date,
                                month,
                                year,
                                personal: bools
                            }
                        ],
                        date: ds,
                        userid: req.body.id,
                        room: uuidv4(),
                        image: user.img,
                        email: user.username,
                        name: user.name
                    })
                }
            }
            const arr = user.subarray
            const pills = arr.concat(volume)
            await User.findOneAndUpdate({ _id: req.body.id }, { subarray: pills })
            await User.findByIdAndUpdate({ _id: req.body.id }, { cart: [] })
            res.json({ value: 'yes' })
        }
        else {
            console.log('vanced');
            res.json({ message: 'Better luck next time' })
        }
    } catch (error) {
        console.log('nah brah');
        console.log(error);
    }

})
app.delete('/api/delete/subs', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id });
        const arr = user.subarray;
        arr.shift();
        await User.findByIdAndUpdate({ _id: req.body.id }, { subarray: arr });
        res.json(arr)
    } catch (error) {
        console.log(error);
    }
})
////////////////////// UPDATE USER URL ///////////////////////////////////

app.put('/api/updatecurrent', async (req, res) => {

    try {
        const doc = await User.findByIdAndUpdate(req.body.id, {
            current: {
                bname: req.body.current.bname,
                name: req.body.current.name,
                category: req.body.current.category
            }
        })
    } catch (error) {
        console.log(error);
    }

})
app.post('/api/update/quality', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, {
            quality: req.body.quality
        })
    } catch (error) {
        console.log(error);
    }
})


///////////////////// UPLOAD QUERY IMAGE ////////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/query')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + uuidv4() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
var multerupload = upload.single('image')

app.post('/api/img/query', multerupload, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.id })
        const obj = user.query;
        const diag = user.query[req.body.place].dialogue;
        const data = {
            statement: `/query/${req.file.filename}`,
            type: req.body.type,
            content: 'image',
            date: req.body.date,
            mins: req.body.mins,
            hours: req.body.hours,
            month: req.body.month,
            year: req.body.year
        }
        diag.push(data);
        obj.dialogue = diag;
        await User.findByIdAndUpdate(req.body.id, { query: obj })
        await Query.findOneAndUpdate({ date: req.body.datee }, { dialogue: diag })

        res.json({ status: 'yes', link: req.file.filename })

    } catch (error) {
        res.json({ status: 'no' })
        console.log('personal msg : line: 629 error');
        console.log(error);
    }
})


///////////////////// UPLOAD VIDEOS ////////////////////////////////


app.post('/api/video/upload', async (req, res) => {

    var video = await Video.create({
        name: req.body.name,
        bname: req.body.bname,
        category: req.body.category,
        minutes: req.body.minutes,
        seconds: req.body.seconds
    })
    video.save();
    res.json(video)

})


//////////////////////////////////// ADD PDF /////////////////////////////////////////////////////////////////
app.post('/api/upload/pdf', async (req, res) => {
    const pdf = await Pdf.create({
        name: req.body.name,
        bname: req.body.bname,
        type: req.body.type
    })
    pdf.save();
    res.json(pdf)
})
/////////////////////////////////// GET PDF /////////////////////////////////////////////////////////////////

app.get('/api/get/pdf', async (req, res) => {
    await Pdf.find({}).then(async function (pdfs) {
        res.send(pdfs);
    });
})


// COMMAND : DASH : MP4Box -dash 2000 -url-template like.mp4#trackID=1:id=vid0:role=vid0 like.mp4#trackID=2:id=aud0:role=aud0 -out videoone.mpd
// COMMAND : HLS : ffmpeg -i videoone.mp4 -codec: copy -start_number 0 -hls_time 5 -hls_list_size 0 -bsf:v h264_mp4toannexb -f hls videoone.m3u8
// COMMAND : FFMPEG: 240P 480P :ffmpeg -i input.mp4 -vf scale=320:240,setsar=1:1 output.mp4
// COMMAND : HLS ALL QUALITY : ffmpeg -y -i 720video.mp4 -preset slow -g 48 -sc_threshold 0 -map 0:0 -map 0:1 -map 0:0 -map 0:1 -map 0:0 -map 0:1 -map 0:0 -map 0:1 -map 0:0 -map 0:1 -map 0:0 -map 0:1 -s:v:0 1920*1080 -b:v:0 1800k -s:v:1 1280*720 -b:v:1 1200k -s:v:2 858*480 -b:v:2 750k -s:v:3 630*360 -b:v:3 550k -s:v:4 426*240 -b:v:4 400k -s:v:5 256*144 -b:v:5 200k -c:a copy -var_stream_map "v:0,a:0,name:1080p v:1,a:1,name:720p v:2,a:2,name:480p v:3,a:3,name:360p v:4,a:4,name:240p v:5,a:5,name:144p" -master_pl_name master.m3u8 -f hls -hls_time 10 -hls_key_info_file enc.keyinfo -hls_playlist_type vod -hls_list_size 0 -hls_segment_filename "v%v/segment%d.ts" v%v/index.m3u8

//////////////////////////////////// GET COURSE //////////////////////////////////////////////////////
app.get('/api/course', async (req, res) => {
    Video.find({}).then(async function (users) {
        res.send(users);
    });
});

///////////////////////////// QUERY HANDLING /////////////////////////////////////////////////////////
app.post('/api/query/box', async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.id })
        const obj = user.query;
        const place = obj.length
        const data = {
            type: req.body.state,
            subject: req.body.sub,
            dialogue: [{
                statement: req.body.query,
                type: req.body.type,
                content: 'text',
                date: req.body.date,
                mins: req.body.mins,
                hours: req.body.hours,
                month: req.body.month,
                year: req.body.year
            }],
            date: Date.now(),
            email: req.body.email,
            room: user.room
        }
        obj.push(data);
        await Query.create({ ...data, userid: req.body.id, place })
        await User.findByIdAndUpdate(req.body.id, { query: obj })
        res.json({ message: 'success' })

    } catch (error) {
        res.json({ message: 'failed' })
        console.log('personal msg : line: 602 error');
        console.log(error);
    }

})

/////////////////////////////// CHAT //////////////////////////////////////////////////////

app.post('/api/chat/user', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id })
        const obj = user.query;
        const diag = user.query[req.body.place].dialogue;
        const data = {
            statement: req.body.statement,
            type: req.body.type,
            content: 'text',
            date: req.body.date,
            mins: req.body.mins,
            hours: req.body.hours,
            month: req.body.month,
            year: req.body.year
        }
        diag.push(data);
        obj.dialogue = diag;
        await User.findByIdAndUpdate(req.body.id, { query: obj })
        await Query.findOneAndUpdate({ date: req.body.datee }, { dialogue: diag })

        res.json({ status: 'yes' })

        if (req.body.type === 'vikas') {
            messageFxn(req.body.email)
        }

    } catch (error) {
        res.json({ status: 'no' })
        console.log('personal msg : line: 629 error');
        console.log(error);
    }
})
app.post('/api/refresh/chat', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id })
        const diag = user.query[req.body.place].dialogue;
        const verify = diag.length;
        if (verify === req.body.length) {
            res.json({ status: 'no' })
        } else {
            res.json({ status: 'yes', diag })
        }
    } catch (error) {
        res.json({ status: 'no' })
        console.log('personal msg : line: 516 error');
        console.log(error);
    }
})



/////////////////////////// GET AND EDIT QUERY /////////////////////////////////////////////

app.get('/api/query/fetch', async (req, res) => {
    await Query.find({}).then((query) => {
        res.json({ query })
    })
})
app.post('/api/query/answer', async (req, res) => {

    const query = await Query.findOne({ userid: req.body.id })
    var arr = query.dialogue
    arr.push(req.body.answer)
})
app.post('/api/stat/query/update', async (req, res) => {
    try {
        await Query.findByIdAndUpdate(req.body.id, { stat: req.body.status }).then(function (response) {
            console.log(response.stat);
            res.json({ status: 'yes' })
        })
    } catch (error) {

    }
})

////////////////////////////////// REFRAL HANDLING ////////////////////////////////////////////


app.post('/api/refral/data', async (req, res) => {
    try {
        const refral = await Refral.findOne({ userid: req.body.id });
        if (refral) {
            res.json({ status: 'yes', refral });
        } else {
            res.json({ status: "no" })
        }
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/refral/post', async (req, res) => {
    try {
        const refral = await Refral.create({
            userid: req.body.id,
            upi: req.body.upi,
        })
        refral.save()
        res.json({ status: 'success' })
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/refral/update', async (req, res) => {
    try {
        await Refral.findOneAndUpdate({ userid: req.body.id }, { upi: req.body.upi })
        res.json({ status: 'yes' })
    } catch (error) {
        console.log(error);
    }
})

//////////////////////////////////// PERSONAL CHATS ////////////////////////////////////////////

app.post('/api/personal/chat/text', async (req, res) => {
    try {
        const chat = await Personal.findOne({ userid: req.body.id });
        var arr = chat.dialogue;
        const data = {
            statement: req.body.chat,
            type: req.body.type,
            content: 'text',
            date: req.body.date,
            mins: req.body.mins,
            hours: req.body.hours,
            month: req.body.month,
            year: req.body.year
        }
        arr.push(data);
        await Personal.findOneAndUpdate({ user: req.body.id }, { dialogue: arr })
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/personal/chat/image', multerupload, async (req, res) => {
    try {
        const chat = await Personal.findOne({ userid: req.body.id });
        var arr = chat.dialogue;
        const data = {
            statement: `/query/${req.file.filename}`,
            type: 'user',
            content: 'image',
            date: req.body.date,
            mins: req.body.mins,
            hours: req.body.hours,
            month: req.body.month,
            year: req.body.year
        }
        arr.push(data);
        await Personal.findOneAndUpdate({ user: req.body.id }, { dialogue: arr });
        const ide = await Personal.findOne({ userid: req.body.id });
        const arraydiag = ide.dialogue.filter(({ content }) => content === 'image');
        const DiagId = arraydiag[arraydiag.length - 1]._id;
        res.json({ status: 'yes', link: req.file.filename, id: DiagId });
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/personal/data/get', async (req, res) => {
    try {
        const data = await Personal.findOne({ userid: req.body.id });
        res.json({ value: data })
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/personal/alldata/get', async (req, res) => {
    try {
        const data = await Personal.find({});
        res.json({ value: data })
    } catch (error) {
        console.log(error);
    }
})

//////////////////////////////////// TRANSACTIONS CONTROL PANEL ////////////////////////////////

app.get('/api/fetch/transactions', async (req, res) => {
    try {
        const transaction = await Payment.find({}).then(function (transaction) {
            res.json(transaction)
        });
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/fetch/refrals', async (req, res) => {
    try {
        const refrals = await Refral.find({}).then(function (refral) {
            res.json(refral)
        })
    } catch (error) {
        console.log(error);
    }
})

//////////////////////////// PANEL KEY ////////////////////////////////////////////////////////

app.post('/api/keyverify', async (req, res) => {
    try {
        const key = process.env.panel_id;
        if (key === req.body.key) {
            res.json({ status: 'yes' })
        } else {
            res.json({ status: 'no' })
        }
    } catch (error) {
        console.log(error);
    }
})

////////////////////////////// CART ///////////////////////////////////////////////////////////

app.post('/api/cart', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, { cart: req.body.cart })
        res.json({ status: 'yes' })
    } catch (error) {
        res.json({ status: 'no' })
    }
})
app.post('/api/cartremove', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, { cart: req.body.cart })
        res.json({ status: 'yes' })
    } catch (error) {
        res.json({ status: 'no' })
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/remove/query', async (req, res) => {

    const user = await User.findOne({ _id: req.body.id })
    const obj = user.query;
    obj.shift();
    const query = await User.findByIdAndUpdate(req.body.id, { query: obj })
    res.json(query.query)

})
app.get('/api/remove/token', async (req, res) => {

    const user = await User.findOne({ _id: req.body.id })
    const obj = user.tokens;
    obj.shift();
    const query = await User.findByIdAndUpdate(req.body.id, { tokens: obj })
    res.json(query.tokens)

})
/////////////////////////////////////// CREATE AND HANDLE VARIABLES ///////////////////////////////////////////

app.post('/api/variables/create', async (req, res) => {
    try {
        await Variables.create({
            var1: req.body.var1,
            var2: req.body.var2,
            var3: req.body.var3,
            var4: req.body.var4,
            var5: req.body.var5,
            var6: req.body.var6,
            var7: req.body.var7,
            var8: req.body.var8,
            var9: req.body.var9,
            var10: req.body.var10,
            var11: req.body.var11,
            var12: req.body.var12,
            var13: req.body.var13,
            var14: req.body.var14,
            var15: req.body.var15,
            var16: req.body.var16,
            var17: req.body.var17,
            var18: req.body.var18,
            var19: req.body.var19,
            var20: req.body.var20,
        })
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/variables/fetch', async (req, res) => {
    try {
        const variables = await Variables.find({});
        res.json(variables);
    } catch (error) {
        console.log(error);
    }
})
app.put('/api/variables/update', async (req, res) => {
    try {
        await Variables.findByIdAndUpdate(req.body.id, { var1: req.body.var1 });
        await Variables.findByIdAndUpdate(req.body.id, { var2: req.body.var2 });
        await Variables.findByIdAndUpdate(req.body.id, { var3: req.body.var3 });
        await Variables.findByIdAndUpdate(req.body.id, { var4: req.body.var4 });
        await Variables.findByIdAndUpdate(req.body.id, { var5: req.body.var5 });
    } catch (error) {
        console.log(error);
    }
})

////////////////////////////////////// PYQ handeling ///////////////////////////////////////////////////////////

app.get('/api/pyq/get', async (req, res) => {
    try {
        const pyq = await Pyq.find({})
        res.json(pyq)
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/pyq/create', async (req, res) => {
    try {
        const pyq = await Pyq.create({
            name: req.body.name,
            bname: req.body.bname,
            type: req.body.type
        })
    } catch (error) {
        console.log(error);
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////

server.listen(process.env.PORT || 4000, function () {
    console.log("server is running on port: 4000");
});
