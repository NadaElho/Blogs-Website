const User = require("../models/user.model")

const registerUser = async(user)=>{
    try{
        return await User.create(user)
    }
    catch(err){
        console.log(err);
    }
}

const findUserByEmail = async(email)=>{
    return await User.findOne({email});
}


module.exports = {
    registerUser,
    findUserByEmail,
}