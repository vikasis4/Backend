const express = require('express');
const cors = require('cors');
const User = require('./models/user.model')
const Video = require('./models/video')
const mongoToConnect = require('./mongodb')
const bcrypt = require('bcryptjs');
const verify = require('./middleware/verify')
const dotenv = require('dotenv');
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
const History = require('./models/traffichistory');
const { v4: uuidv4 } = require('uuid');
const Personal = require('./models/personal');
const Pyq = require('./models/pyq');
const Variables = require('./models/variables');
const { spawn } = require('child_process');
const CronJob = require('cron').CronJob;
const mongoose = require('mongoose');
const payUMoney = require('./payUmoney');
const Live = require('./models/live');
const live = require("./live");
const Task = require('./models/task');
const Form = require('./models/form');

///////////////////// ACTIVE COURSE - 1-1 NOT ADD ON ///////////////////////////

const app = express();
app.use(require('express-status-monitor')());
const server = require('http').createServer(app);

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
app.use(cors({ origin:['https://rankboost.live', 'https://admin.rankboost.live', 'https://api.payu.in/'], credentials: true}));
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'https://api.payu.in', 'http://192.168.1.35:3000'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var make = path.join(__dirname, 'public');
app.use(express.static(make));

const bilx = async () => {
    await mongoose.model("User").updateMany({}, {
        $set: {
            phone: null
        }
    })
}
// bilx()
///////////////////////// LIVE RELOADER /////////////////////////
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
            try {
                await User.findOneAndUpdate({ username: req.body.username }, { last_seen: `${day}/${month}/${year}` })
            } catch (error) {
                console.log('live-token-error');
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
////////////////////////////////// ACTIVE COURSE /////////////////////////////////////////////////////
app.post('/api/manage/course', async (req, res) => {
    try {
        var pin = process.env.pin;
        var vipin = req.body.pin;
        if (pin === vipin) {
            var num = { name: req.body.typ }
            var user = await User.findOne({ username: req.body.email });
            var subs = user.subarray;
            subs.push(num);
            if (user.subscription === 'false') {
                await User.findOneAndUpdate({ username: req.body.email }, { subscription: 'true' });
            }
            var type = 'empty'
            if (user.refral === 'empty') {
                type = 'normal'
            } else {
                type = 'refral'
            }
            const ds = new Date();
            const payment = await Payment.create({
                refrence_nos: 6969,
                transaction_id: 6969,
                user: user._id,
                date: ds,
                type: type,
                cart: subs
            });
            payment.save()
            await User.findOneAndUpdate({ username: req.body.email }, { subarray: subs });
            res.json({ status: 'success' })
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 'falied' })
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

            // const vref = await Refral.findOne({ userid: req.body.refral })
            // if (vref) {
            //     const user = await User.create({
            //         username: req.body.username,
            //         password: req.body.password,
            //         img: req.body.img,
            //         otp: true,
            //         refral: req.body.refral,
            //         name: req.body.namee,
            //         room: uuidv4()
            //     })
            //     const token = await user.generateToken();
            //     user.save();
            //     var newUser = await User.findOne({ username: req.body.username });
            //     res.json({ message: "yup", token, newUser });

            //     var cred = {
            //         pass: req.body.password,
            //         email: user.username
            //     }
            //     passFxn(cred);
            //     reffile("account", req.body.username, req.body.refral)
            // } else {
            var toks = '';
            if (req.body.refral) {
                toks = req.body.refral
            }
            const user = await User.create({
                username: req.body.username,
                password: req.body.password,
                img: req.body.img,
                otp: true,
                refral: toks,
                room: uuidv4()
            })
            const token = await user.generateToken();
            user.save();
            var newUser = await User.findOne({ username: req.body.username });
            res.json({ message: "yup", token, newUser });

            var cred = {
                pass: req.body.password,
                email: user.username
            }
            passFxn(cred);
            reffile("account", req.body.username, req.body.refral)
            // }
        }
        else {
            try {
                var toks = '';
                if (req.body.refral) {
                    toks = req.body.refral
                }
                const vref = await Refral.findOne({ userid: req.body.refral })
                if (vref) {
                    const user = await User.create({
                        username: req.body.username,
                        password: req.body.password,
                        refral: toks,
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
        if (!user) {
            res.json({ val: 'no' })
        }
        else if (user && user.otp === false) {
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
////////////////////////////// WEEKLY TASK ///////////////////////////////////////////////////////////////
app.post('/api/weeklytask/update', async (req, res) => {
    try {
        await Task.findOneAndUpdate({ _id: '63dbed1ce28b3fa30a7aefd1' }, {
            tasks: req.body.array,
            time: {
                from: req.body.from,
                to: req.body.to
            }
        })
        res.json({ status: 'yes' })
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/weeklytask', async (req, res) => {
    try {
        var fo = await Task.find({});
        res.json({ task: fo[0].tasks, from: fo[0].time.from, to: fo[0].time.to });
    } catch (error) {
        console.log(error);
    }
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
//////////////////////////////////  PAYU  /////////////////////////////////////////////

app.post('/api/payments/payumoney', payUMoney.payUMoneyPayment);
app.post('/payu/success', async (req, res) => {

    try {
        var user = await User.findById(req.body.udf1);
        var subsarray = user.subarray;
        var type = 'empty'
        if (user.refral === 'empty') {
            type = 'normal'
        } else {
            type = 'refral'
        }
        var string = req.body.udf2;
        var pkey = user.pkey
        var cart = [];
        var derator = string.length / 4;

        if (req.body.status === 'success') {
            for (let i = 0; i < derator; i++) {
                if (string.slice(i * 4, (i + 1) * 4) === 'drdo') {
                    cart.push({ name: '2023CC' });
                }
                else if (string.slice(i * 4, (i + 1) * 4) === 'bros') {
                    cart.push({ name: 'material' });
                }
            }

            const payment = await Payment.create({
                refrence_nos: req.body.bank_ref_num,
                transaction_id: req.body.mihpayid,
                user: req.body.udf1,
                date: req.body.addedon,
                type: type,
                cart: cart
            })
            payment.save();
            subsarray.push(...cart);
        }
        var vpkey = parseInt(req.body.udf3);
        if (pkey === vpkey) {
            if (user.subscription === 'false') {
                await User.findByIdAndUpdate(req.body.udf1, { subscription: 'true' })
            }
            await User.findByIdAndUpdate(req.body.udf1, { subarray: subsarray });
            await User.findByIdAndUpdate(req.body.udf1, { cart: [] });
            await User.findByIdAndUpdate(req.body.udf1, { pkey: 0000 })
        }
        res.send(
            `
            <div
        style="height: 100%; width:100%; display:flex; justify-content:center; align-items:center ">
        <h2 style="font-size:62px; text-align:center "> <span style="color:green"> Payment successfull </span><br /><br /><br /> Click on <a
                href="https://rankboost.live">RankBoost</a> to return to the website </h2>
        </div>
            `
        );
    } catch (error) {
        console.log(error);
    }
})
app.post('/payu/failed', async (req, res) => {
    res.send(
        `
        <div
        style="height: 100%; width:100%; display:flex; justify-content:center; align-items:center ">
        <h2 style="font-size:62px; text-align:center "> <span style="color:red"> Error :- Payment Failed </span><br /><br /><br /> Click on <a
                href="https://rankboost.live">RankBoost</a> to return to the website </h2>
        </div>
        `
    );
})


///////////////////////////////////////////////////////////////////////
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
app.post('/api/delete/user', async (req, res) => {
    try {
        if (req.body.pin === process.env.pin) {

            await User.findOneAndDelete({ username: req.body.id })
            try {
                await Personal.findOneAndDelete({ email: req.body.id })
            } catch (error) { }
            try {
                await Query.findOneAndDelete({ email: req.body.id })
            } catch (error) { }
            res.json({ status: 'yes' })
        } else {
            res.json({ status: 'no' })
        }
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
//////////////////////////////////// COURSE FORM /////////////////////////////////////////////////////////////
app.post('/api/get-form-info', async (req, res) => {
    try {
        var gb = await Form.findOne({ id: req.body.id })
        if (gb) {
            res.json({ status: 'yes' })
        } else {
            res.json({ status: 'no' })
        }
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/course-form', async (req, res) => {
    try {
        var form = req.body.form;
        await Form.create({
            id: req.body.men,
            q1: form.q1,
            q21: form.q21,
            q22: form.q22,
            q3: form.q3,
            q4: form.q4,
            q5: form.q5,
            q6: form.q6,
            q7: form.q7,
            q8: form.q8,
            q9: form.q9,
            q10: form.q10,
            q11: form.q11,
            q12: form.q12,
            q13: form.q13,
            q14: form.q14,
        })
        await User.findByIdAndUpdate(req.body.men, { phone: form.q3 });
        res.json({ status: 'yes' })
    } catch (error) {
        res.json({ status: 'no' })
        console.log(error);
    }
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
            room: user.room,
            img: user.img
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
        if (req.body.id.length === 0) {   
            res.json({ status: 'yes' })
        }else{
            await User.findByIdAndUpdate(req.body.id, { cart: req.body.cart })
            res.json({ status: 'yes' })
        }
    } catch (error) {
        res.json({ status: 'no' })
    }
})
app.post('/api/cartremove', async (req, res) => {
    try {
        if (req.body.id.length === 0) {   
            res.json({ status: 'yes' })
        }else{
            await User.findByIdAndUpdate(req.body.id, { cart: req.body.cart })
            res.json({ status: 'yes' })
        }
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
////////////////////////////// DASHBOARD GET USERS && REFRAL GET USERS ////////////////////////////////////////////////////

app.get('/api/all/users', async (req, res) => {
    try {
        var users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
})
app.post('/api/refral/users', async (req, res) => {
    try {
        var refid = req.body.value;
        var users = await User.find({});
        var total = [];
        var subs = [];
        var mats = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].refral === refid) {
                total.push({ date: users[i].date });
                if (users[i].subscription === 'true') {
                    for (let j = 0; j < users[i].subarray.length; j++) {
                        if (users[i].subarray[j].name === '2023CC') {
                            subs.push({ date: users[i].date });
                        }
                        else if (users[i].subarray[j].name === 'material') {
                            mats.push({ date: users[i].date });
                        }
                    }
                }
            } else {
                continue;
            }
        }
        res.json({ status: 'success', total, subs, mats });
    } catch (error) {
        res.json({ status: 'failed' })
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
