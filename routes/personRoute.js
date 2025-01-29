const express = require('express');
const router = express.Router();

const Person=require('./../models/Person.js');
const {jwtAuthMiddleware,generateToken}=require('./../jwt.js');
//const generateToken=

router.post('/signup',async (req,res)=>{
    try{
        const data=req.body
        const newperson=new Person(data);
        const response=await newperson.save();
        console.log('data saved');
        
        const payload={
            id:response.id,
            username:response.username
        }
        const token= generateToken(payload);
        console.log('token is : ', token);
        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Servers Error'});
    }

})

// login route

router.post('/login',async (req,res)=>{
    try{
        const {username,password}=req.body;

        const user=await Person.findOne({username:username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or password'});
        }
        const payload={
            id:user.id,
            username:user.username
        }
        const token= generateToken(payload);
        res.json({token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Servers Error'});
    }
})

router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData=req.user;
    console.log("user data: " ,userData);

    const userId=userData.id;
    const user=await Person.findById(userId);
    res.status(200).json({user});
    }catch(err){console.log(err);
        res.status(500).json({error:'Internal Servers Error'});
     }
})

// GET method to get the person

router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Servers Error'});
    }
    
})
router.get('/:workType',async (req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType =='chef'||workType=='manager'||workType=='waiter'){
            const response=await Person.find({work: workType})
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            console.log('Invalid prof');res.status(200).json("Invalid worktype");
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Servers Error'});
    }
    
})

router.put('/:id', async (req,res)=>{
    try{
        const personID= req.params.id;
        const updatedpersonData=req.body;
        const response=await Person.findByIdAndUpdate(personID,updatedpersonData,{
            new: true, // return update value
            runValidators: true // run mongoose validator

        })
        if(!response){
            return res.status(404).json('Person with id not found');
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log('error occuord');
        res.status(500).json(error,'server error occourured');
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const personID= req.params.id;
        const response= await Person.findByIdAndDelete(personID);
        if(!response){
            return res.status(404).json('person Id not found');
        }
        console.log('data deleted successfully');
        res.status(200).json('Person deleted successfully');

    }
    catch(err){
        console.log('error occuord');
        res.status(500).json(error,'server error occourured');
   }
})
module.exports=router;