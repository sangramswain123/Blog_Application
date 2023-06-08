const TokenExpiredError = require('jsonwebtoken');
const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    }
})

const token = mongoose.model('token',tokenSchema);
module.exports = token;