const mongoose=require('mongoose');

const logSitesSchema=new mongoose.Schema({
    log:{
        type: String,
        require: true
    }
})

const logSites=mongoose.model('logSites',logSitesSchema);
module.exports=logSites;

