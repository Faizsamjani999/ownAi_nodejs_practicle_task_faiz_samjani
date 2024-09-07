const User = require("../models/User")

const listUsers = async(req,res)=>{
    try{
        if(req.user.role !== 'Admin')
        {
            return res.status(403).json({message:"Access Denied..."})
        }

        const {name,email,country} = req.query;

        let filter = {};

        if(name)
        {
            filter.name = {$regex: new RegExp(name,'i')};
        }

        if(email)
        {
            filter.email = {$regex: new RegExp(email,'i')};
        }

        if(country)
        {
            filter.country = { $regex: new RegExp(`^${country}$`, 'i') };
        }
        const users = await User.find(filter);

        if(users.length === 0)
        {
            return res.status(404).json({message:"Sorry,No User Found..."})
        }
        return res.json(users);
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

const userDetail = async(req,res)=>{
    const {userId} = req.params;

    try{
        if(req.user.role === 'Staff' && req.user.userId !== userId)
        {
            return res.status(403).json({message:"Access Denied..."})
        }
        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(404).json({message:"User Not Found..."})
        }
        return res.status(200).json(user)
    }catch(err)
    {
        return res.status(500).json({error:err.message});
    }
}

module.exports = {
    listUsers,
    userDetail
}