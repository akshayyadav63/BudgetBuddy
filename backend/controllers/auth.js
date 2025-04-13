const config=require('dotenv');
const authModel=require('../models/authModel');
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");

const JWT_SECRET_KEY=process.env.JWT_SECRET;

exports.signup= async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        if(!username || !email||!password) return res.status(400).json({message:"All the field are required"});
        const user=await authModel.findOne({email})
        if(user) return res.status(400).json({message:"user already exists"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser=await authModel.create({
            username,
            email,
            password:hashedPassword
        })
        const token=jwt.sign({id:newuser._id},JWT_SECRET_KEY)
        res.cookie("token",token);

        res.status(201).json({message:"user created successfully",token})
    }catch(error){
        res.status(500).json({message:error.message});
    }

}

exports.login= async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await authModel.findOne({email});
        if(!user)return res.status(404).json({message:"user not found"});
        const isvalidpassword=await bcrypt.compare(password,user.password)
        if(!isvalidpassword) return res.status(400).json ({message:"Invalid Password"});
         
        const token=jwt.sign({id:user._id},JWT_SECRET_KEY)
        res.cookie("token",token);
        res.status(200).json({ message: "Login successful", user });
     

    } catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.logout = async  (req,res)=>{
         await res.cookie("token","");
         res.redirect('/');

}
