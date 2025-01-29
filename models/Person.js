const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const { decrypt } = require('dotenv');
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
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});



personSchema.pre('save',async function (next) {
    const person=this;
    // hash the password only if it has been modified or its new
    if(!person.isModified('password')) return next();
    try{
        const salt= await bcrypt.genSalt(10);
        // hash password
        const hashPassword=await bcrypt.hash(person.password,salt);
        // overwrirte the main password
        person.password=hashPassword;
        next();

    }catch(err){
            return next(err);
    }
})

personSchema.methods.comparePassword= async function(cantidatePassword){
    try{
    // use bcrypt to compare password for authentication
    const isMatch= await bcrypt.compare(cantidatePassword,this.password);
        return isMatch;
    }catch(err){

    }
}

//create person model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;

