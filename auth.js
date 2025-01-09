const passport= require('passport');
const localStrategy=require('passport-local').Strategy;
const Person=require('./models/Person.js');



passport.use(new localStrategy(async (uname, pword, done)=>{
    try{
        // console.log('Recived credentials', uname,pword);
        const user=await Person.findOne({username: uname})
        if(!user){
            return done(null,false,{message:'Incorrect username'});

        }
        const passmatch=user.comparePassword(passport); //password===pword ? true: false;
        if(passmatch)
            return done(null,user);
        else
            return done(null,false,{message:'Incorrect password'});
    }catch(err){

    }
}))

module.exports=passport;