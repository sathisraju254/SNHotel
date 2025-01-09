const express = require('express');
const app = express();
const db=require('./db');
require('dotenv').config();
//command to check git
const bodyParser=require('body-parser');
const logSites=require('./models/logSites.js');
const passport= require('./auth.js');

const mongoose = require('mongoose');

app.use(bodyParser.json());  // stores in req.body   
//Middle ware function
const logRequest=async (req,res,next)=>{

    // const logEntry = new Log({
    //     log:`${new Date().toLocaleString()} request made to : ${req.originalUrl}`
    //   });
    // const newLog= new logSites(logEntry);
    // const response=await newLog.save();
     console.log(`${new Date().toLocaleString()} request made to : ${req.originalUrl}`);
    
    next(); // move to nexr phase
}

const PORT=process.env.PORT || 3000;

app.use(passport.initialize());
const localAuthmiddleware=passport.authenticate('local',{session: false });

app.get('/',logRequest ,function(req,res){res.send("welcome to SN hotel")})

const Personroutes=require('./routes/personRoute.js');
app.use('/person',logRequest,Personroutes);

const menuRoute=require('./routes/menuRoute.js');
app.use('/menuItem',localAuthmiddleware,menuRoute);

const orderItemRoute=require('./routes/orderItemRoute.js');
app.use('/orderitem',orderItemRoute);

app.listen(PORT,()=>{
    console.log("console is running on 3000")
})