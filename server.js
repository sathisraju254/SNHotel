const express = require('express');
const app = express();
const db=require('./db');

const bodyParser=require('body-parser');


const { get } = require('mongoose');
const moongoose = require('moongoose');
app.use(bodyParser.json());  // stores in req.body

    

app.get('/',function(req,res){res.send("welcome to SN hotel")})

const Personroutes=require('./routes/personRoute.js');
app.use('/person',Personroutes);

const menuRoute=require('./routes/menuRoute.js');
app.use('/menuItem',menuRoute);

const orderItemRoute=require('./routes/orderItemRoute.js')
app.use('/orderitem',orderItemRoute);

app.listen(3000,()=>{
    console.log("console is running on 3000")
})