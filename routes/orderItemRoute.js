const express=require('express');
const router=express.Router();

const OrderItem=require('./../models/OrderItem.js');
const { get } = require('mongoose');


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

router.put('/:id',async (req,res)=>{
    try{
        const orderID=req.params.id;
        const orderItemupdatedata=req.body;
        const response=await OrderItem.findByIdAndUpdate(orderID,orderItemupdatedata,{
            new:true,
            runValidators:true
        })

        if(!response){
            return res.status(404).json('Order id is not found');
        }
        console.log('order data updated successfully');
        res.status(200).json(response);

    }catch(err){
        console.log('Error'+ err);
        res.status(500).json(Error,'internal server error');
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const orderID=req.params.id;
        const response=await OrderItem.findByIdAndDelete(orderID);
        if(!response){
            return res.status(404).json('Order id not found '+ orderID)
        }
        console.log('order data delted successfully '+ orderID);
        res.status(200).json('order id deleted successfully '+ orderID)

    }catch(err){
        console.log(err);
        res.status(500).json('Internal server error');

    }
})

module.exports=router;