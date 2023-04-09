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
    //         `
    //         <div
    //     style="height: 100%; width:100%; display:flex; justify-content:center; align-items:center ">
    //     <h2 style="font-size:62px; text-align:center "> <span style="color:green"> Payment successfull </span><br /><br /><br /> Click on <a
    //             href="https://rankboost.live">RankBoost</a> to return to the website </h2>
    //     </div>
    //         `
    //     );
    // } catch (error) {
    //     console.log(error);
    // }
}

const payment_failed = async (req, res) => {
    res.send(
        `
        <div
        style="height: 100%; width:100%; display:flex; justify-content:center; align-items:center ">
        <h2 style="font-size:62px; text-align:center "> <span style="color:red"> Error :- Payment Failed </span><br /><br /><br /> Click on <a
                href="https://rankboost.live">RankBoost</a> to return to the website </h2>
        </div>
        `
    );
}

module.exports = {payment_failed, payment_success}