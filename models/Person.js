const mongoose=require('mongoose');
// const moongoose = require('moongoose');

const personSchema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager','stoward','cleaner'],
        require: true
    },
    mobile:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    address:{
        type:String
    },
    salary:{
        type: Number,
        require: true
    }
});

//create person model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;

