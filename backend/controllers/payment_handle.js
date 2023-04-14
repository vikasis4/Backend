const payment_success = async (req, res) => {

    // try {
    //     var user = await User.findById(req.body.udf1);
    //     var subsarray = user.subarray;
    //     var type = 'empty'
    //     if (user.refral === 'empty') {
    //         type = 'normal'
    //     } else {
    //         type = 'refral'
    //     }
    //     var string = req.body.udf2;
    //     var pkey = user.pkey
    //     var cart = [];
    //     var derator = string.length / 4;

    //     if (req.body.status === 'success') {
    //         for (let i = 0; i < derator; i++) {
    //             if (string.slice(i * 4, (i + 1) * 4) === 'drdo') {
    //                 cart.push({ name: '2023CC' });
    //             }
    //             else if (string.slice(i * 4, (i + 1) * 4) === 'bros') {
    //                 cart.push({ name: 'material' });
    //             }
    //         }

    //         const payment = await Payment.create({
    //             refrence_nos: req.body.bank_ref_num,
    //             transaction_id: req.body.mihpayid,
    //             user: req.body.udf1,
    //             date: req.body.addedon,
    //             type: type,
    //             cart: cart
    //         })
    //         payment.save();
    //         subsarray.push(...cart);
    //     }
    //     var vpkey = parseInt(req.body.udf3);
    //     if (pkey === vpkey) {
    //         if (user.subscription === 'false') {
    //             await User.findByIdAndUpdate(req.body.udf1, { subscription: 'true' })
    //         }
    //         await User.findByIdAndUpdate(req.body.udf1, { subarray: subsarray });
    //         await User.findByIdAndUpdate(req.body.udf1, { cart: [] });
    //         await User.findByIdAndUpdate(req.body.udf1, { pkey: 0 })
    //     }
    //     res.send(
    // `
    // <div style="height: 100vh; width:100vw; display:flex; justify-content:center; align-items:center; flex-direction:column ">
    // <h2 style="font-size:4rem; text-align:center; color:green">Payment Successsfull</h2>
    // <h1 style="color:#5A4FCF; font-size:8rem">RankBoost</h1>
    // <a style="text-decoration:none; display:flex; justify-content:center; padding:1rem 4rem; align-items:center; font-size:4rem; background-color:#5A4FCF; color:white; height:8rem;  border-radius:4px" href="https://rankboost.vercel.app">Return to Home</a>
    // </div>
    // `
    //     );
    // } catch (error) {
    //     console.log(error);
    // }
}

const payment_failed = async (req, res) => {
    res.send(
        `
        <div style="height: 100vh; width:100vw; display:flex; justify-content:center; align-items:center; flex-direction:column ">
        <h2 style="font-size:4rem; text-align:center; color:red">Payment Failed</h2>
        <h1 style="color:#5A4FCF; font-size:8rem">RankBoost</h1>
        <a style="text-decoration:none; display:flex; justify-content:center; padding:1rem 4rem; align-items:center; font-size:4rem; background-color:#5A4FCF; color:white; height:8rem;  border-radius:4px" href="https://rankboost.vercel.app">Return to Home</a>
        </div>
        `
    );
}

module.exports = { payment_failed, payment_success }