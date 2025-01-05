const express=require('express');
const router=express.Router();

const OrderItem=require('./../models/OrderItem.js');


router.post('/',async (req,res)=>{
    try{
    const data=req.body;
    const newOrderItem=new OrderItem(data);
    const response= await newOrderItem.save();
    console.log('Data saved successfully');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json(error,'Internally something bad lines of codes')
    }
})

router.get('/',async (req,res)=>{
    try{
    const data=await OrderItem.find();
    console.log("order data fetched successfully")
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json(error,"Internal server error")
    }
})

module.exports=router;