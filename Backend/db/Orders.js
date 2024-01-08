const mongoose = require("mongoose");

const Orders = mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },
    orders:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Orders',Orders);
