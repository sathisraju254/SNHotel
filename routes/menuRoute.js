const express= require('express');
const router= express.Router();

const menuItem=require('./../models/MenuItem.js');
const OrderItem = require('../models/OrderItem.js');

router.post('/', async (req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new menuItem(data);
        const response=await newMenuItem.save();
        console.log('data saved successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(200).json(error,'Internal server error');
    }
    })
    
    router.get('/', async (req,res)=>{
        try{
        const item=await menuItem.find();
        console.log('data fetched successfully');
        res.status(200).json(item);
        }
        catch(err){
            console.log(err);
            res.status(500).json(error,'internal server error');
        }
    })

    router.get('/:taste',async (req,res)=>{
        try{
            const taste=req.params.taste;
            if(taste =='sweet'||taste=='spicy'||taste=='sour' || taste=='salty'){
                const response=await menuItem.find({taste: taste})
                console.log('menu '+ taste+ ' data fetched');
                res.status(200).json(response);
            }else{
                console.log('Invalid teaste');res.status(200).json("Invalid filter");
            }
    
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Servers Error'});
        }
        
    })

    router.put('/:id', async (req,res)=>{
        try{
            const menuID=req.params.id;
            const updatedMenuData=req.body;
            const response=await menuItem.findByIdAndUpdate(menuID,updatedMenuData,{
                new:true,
                runValidators:true
            })
            if(!response){
                return res.status(404).json('person id not found');
            }

            console.log('menu data update succsefully');
            res.status(200).json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json('server error occuord');
        }

    })
    router.delete('/:id',async (req,res)=>{
        try{
        const menuID=req.params.id;
        const response=await menuItem.findByIdAndDelete(menuID);

        if(!response){
            return res.status(404).json('menu id not found');
        }
        console.log('data deleted successfully');
        res.status(200).json('Person deleted successfully');
    }
    catch(err){
        console.log(err);
        res.status(500).json('server error occuord');
    }
    })
    module.exports=router;