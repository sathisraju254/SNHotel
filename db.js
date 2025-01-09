const mongoose=require('mongoose');
require('dotenv').config();

//
const mongoURL= process.env.MONGODB_URL_LOCAL;
//  const mongoURL=process.env.MONGODB_URL;;


mongoose.connect(mongoURL,{
    usenewUrlParser:true,
    useUnifiedTopology:true
})

// const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect(process.env.MONGO_URI);
//     }
//   }

const db= mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongoDB server successfully');
})

db.on('error',()=>{
    console.log('error to connected mongoDB server');
})

db.on('disconnected',()=>{
  console.log('disconnected mongoDB server');
})

 module.exports=db;


// Export database connection