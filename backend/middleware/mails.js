const fs = require("fs").promises;
const handlebars = require("handlebars");
const nodemailer = require('nodemailer');
const path = require("path");
const tempotp = "../templates/otp.html";
const temprefralpaid = "../templates/refralPaid.html";
const temppass = "../templates/password.html";
const tempmsg = "../templates/message.html";
const tempacc = "../templates/account.html";

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
    sendMail(mailOptions)
}


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
    sendMail(mailOptions)
}


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
    sendMail(mailOptions)
}


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
    sendMail(mailOptions)
}

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
    sendMail(mailOptions)
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

transpoter.verify(function (err, res) {
    if (err) {
        console.log('connection failed');
    }
    else {
        console.log('Email services are Live');
    }
})


const sendMail = (mailOptions) => {

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
