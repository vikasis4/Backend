var str = "order_id=23bfb698-ba8b-4d35-9e67-ea9e48455b08&tracking_id=112892573139&bank_ref_no=20230527011030000869164220338576042&order_status=Success&failure_message=&payment_mode=Wallet&card_name=Paytm&status_code=null&status_message=Txn Success&currency=INR&amount=1.00&billing_name=Rankboost&billing_address=Rankboost Office&billing_city=Gurugram&billing_state=Haryana&billing_zip=13001&billing_country=India&billing_tel=7988500286&billing_email=contact@rankboost.live&delivery_name=Rankboost&delivery_address=Rankboost Office&delivery_city=Gurugram&delivery_state=Haryana&delivery_zip=133001&delivery_country=India&delivery_tel=7988500286&merchant_param1=643ac4d9758a1e729ce910b3&merchant_param2=798885721462&merchant_param3=&merchant_param4=additional Info&merchant_param5=additional Info&vault=N&offer_type=null&offer_code=null&discount_value=0.0&mer_amount=1.00&eci_value=null&retry=N&response_code=0&billing_notes=&trans_date=27/05/2023 10:28:17&bin_country="

const User = require('../models/user.model');
const Chat = require('../models/chat');
const PaySlip = require('../models/paySlip');
const { AddMoney } = require('../controllers/referal')
const assignMentor = require('../middleware/assignMentor');

// execute(str)