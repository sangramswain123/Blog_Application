const Admin = require('../model/admin.js');
const Token = require('../model/token.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

exports.signupAdmin = async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password ,10);
        const admin = {name:req.body.name ,email:req.body.email ,password:hashedPassword};
        const newAdmin = new Admin(admin);
        await newAdmin.save();

        return res.status(200).json({msg:'signup sucessful'});
    }catch(err){
        console.log(err);
        return res.status(200).json({msg:'error while signup the admin'});
    }
}

exports.loginAdmin = async (req,res) => {
    let admin = await Admin.findOne({email: req.body.email});
    if(!admin){
        return res.status(400).json({msg: 'admin name does not match'});
    }

    try {
        let match = await bcrypt.compare(req.body.password , admin.password);
        if(match)
        {
            const accessToken = jwt.sign(admin.toJSON() ,process.env.ACCESS_SECRET_KEY ,{expiresIn: '15m'});
            const refreshToken = jwt.sign(admin.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token: refreshToken}) 
            await newToken.save();

            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name:admin.name,email:admin.email});
        }
        else{
            return res.status(400).json({msg: 'Password does not match'});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({msg:'Error while login in admin'});
    }
}
