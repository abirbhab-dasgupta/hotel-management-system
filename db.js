const mongoose = require('mongoose');
require('dotenv').config();

//define mongodb url
//const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = process.env.DB_URL;


mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () =>{
    console.log('connected to mongoDB server')
})

db.on('error', (err) =>{
    console.log('mongoDB connection ERROR',err)
})

db.on('disconnected', () =>{
    console.log('disconnected from mongoDB server')
})

module.exports = db;