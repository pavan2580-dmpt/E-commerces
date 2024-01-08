const mongoose = require('mongoose');

const Products = mongoose.Schema(
    {
        image:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        price:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        cate:{
            type:String,
            required:true,
        },
        recomend:{
            type:String
        },
        offer:{
            type:String
        }
    }
)

module.exports = mongoose.model("Products",Products)