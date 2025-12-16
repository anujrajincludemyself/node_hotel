const mongoose = require('mongoose');

const mongourl = 'mongodb://127.0.0.1:27017/hotels';

const db = mongoose.connection;

mongoose.connect(mongourl ,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

db.on('connected',()=>{
console.log('connected');
})

db.on('error',()=>{
    console.log('error occured');    
})
db.on('disconnected',()=>{
    console.log('disconnected');        
})

module.exports = mongoose;