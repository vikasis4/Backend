const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/paceway?readPreference=primary&serverSelectionTimeoutMS=2000&appname=mongosh+1.5.0&directConnection=true&ssl=false'

mongoose.set("strictQuery", false);

const mongoToConnect = async ()=>{
     await mongoose.connect(url, ()=> {
        console.log('Connected to MOngoDB');
    })
}

module.exports = mongoToConnect

