const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async(req, res, next)=>{
    try{
        const token = req.headers['jwt'];
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(!token) return res.status(401).send({message:"unauthorized user"});

        payload = jwt.verify(token, "secrettokenkey")
        const {email} = payload;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send({message:"unauthorized user"});
        }
        next();
    }catch(err){
        return res.status(401).send({message: err})
    }
}

module.exports = {auth}