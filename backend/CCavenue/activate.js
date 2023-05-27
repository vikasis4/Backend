var str = "order_id=tdr&tracking_id=112892403545&bank_ref_no=20230527011040000869020553745868751&order_status=Success&failure_message=&payment_mode=Wallet&card_name=Paytm&status_code=null&status_message=Txn Success&currency=INR&amount=1.00&billing_name=Peter&billing_address=Santacruz&billing_city=Mumbai&billing_state=MH&billing_zip=400054&billing_country=India&billing_tel=9876543210&billing_email=testing@domain.com&delivery_name=Sam&delivery_address=Vile Parle&delivery_city=Mumbai&delivery_state=Maharashtra&delivery_zip=400038&delivery_country=India&delivery_tel=0123456789&merchant_param1=additional Info&merchant_param2=additional Info&merchant_param3=additional Info&merchant_param4=additional Info&merchant_param5=additional Info&vault=N&offer_type=null&offer_code=null&discount_value=0.0&mer_amount=1.00&eci_value=null&retry=N&response_code=0&billing_notes=&trans_date=27/05/2023 00:57:24&bin_country="
var ty = str.split("&");
var arr = [];
for (let i = 0; i < ty.length; i++) {
    var gos = ty[i].split("=");
    arr.push({
        type: gos[0],
        value: gos[1],
    })
}
var res = arr.find(({ type }) => type === 'order_status').value
res === 'Success' ? console.log(true) : console.log(false);