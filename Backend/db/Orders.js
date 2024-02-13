const mongoose = require("mongoose");

const Orders = mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phno:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    apt:{
        type:String,
        required:true
    },
    tc:{
        type:String,
        required:true
    },
    orders:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('Orders',Orders);
