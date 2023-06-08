
const User = require('../model/user.js');
const Token = require('../model/token.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

exports.signupUser = async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password ,10);
        const user = {name:req.body.name ,email:req.body.email ,password:hashedPassword};
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg:'signup sucessful'});
    }catch(err){
        console.log(err);
        return res.status(200).json({msg:'error while signup the user'});
    }
}

exports.loginUser = async (req,res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({msg: 'username does not match'});
    }

    try {
        let match = await bcrypt.compare(req.body.password , user.password);
        if(match)
        {
            const accessToken = jwt.sign(user.toJSON() ,process.env.ACCESS_SECRET_KEY ,{expiresIn: '30m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token: refreshToken}) 
            await newToken.save();
            return res.status(200).json({status: true,accessToken: accessToken, refreshToken: refreshToken, name:user.name,email:user.email});
        }
        else{
            console.log("password not match ");
            return res.status(400).json({msg: 'Password does not match'});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({msg:'Error while login in user'});
    }
}

// module.exports = signupUser;