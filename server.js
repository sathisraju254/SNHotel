const express = require('express');
const app = express();
const db=require('./db');
require('dotenv').config();
//command to check git
const bodyParser=require('body-parser');


const { get } = require('mongoose');
const moongoose = require('moongoose');
app.use(bodyParser.json());  // stores in req.body

   
const PORT=process.env.PORT || 3000; 

app.get('/',function(req,res){res.send("welcome to SN hotel")})

const Personroutes=require('./routes/personRoute.js');
app.use('/person',Personroutes);

const menuRoute=require('./routes/menuRoute.js');
app.use('/menuItem',menuRoute);

const orderItemRoute=require('./routes/orderItemRoute.js')
app.use('/orderitem',orderItemRoute);

app.listen(PORT,()=>{
    console.log("console is running on 3000")
})