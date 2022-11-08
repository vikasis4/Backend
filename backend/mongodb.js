const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()



const url = process.env.connection_string


const mongoToConnect = async ()=>{

     await mongoose.connect(url, ()=> {
        console.log('Connected to MOngoDB');
    })
}

module.exports = mongoToConnect

