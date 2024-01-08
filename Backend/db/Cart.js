const mongoose = require('mongoose')

const Cart = mongoose.Schema(
    {
        productId :{type:String},
        image:{type:String},
        price:{type:String}
    }
)

module.exports  = mongoose.model('Cart',Cart)