const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async(req,res)=>{
    const {name,email,password,role,phone,city,country} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role,
            phone,
            city,
            country
        });
        await newUser.save();
        return res.status(201).json({message:"User Register Successfully..."});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"Invalid Credential..."});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid Credential..."});
        }
        const token = jwt.sign(
            {userId:user._id,
            role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        return res.json({token});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

module.exports = {
    register,
    login
}