const mongoose = require('mongoose')

const Users = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        lname:{type:String},
        address:{type:String}

    }
)

module.exports = mongoose.model("Users",Users);