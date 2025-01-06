const mongoose=require('mongoose');
const moongoose = require('moongoose');

const OrderItemSchema=mongoose.Schema({
    customer_name:{
        type:String,
        require: true
    },
    Order_item:{
        name:[String],
        default:[]
    },
    TotalBill:{
        type: Number,
        require: true
    },
    kitchenIns:{
        type: String,
    }
})

const OrderItem= mongoose.model('OrderItem',OrderItemSchema);
module.exports=OrderItem;