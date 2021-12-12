const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(
    process.env.MONGO_URL,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true        
    }
    )
.then(()=>{
    console.log("connected to mongoDb atlas")
}).catch((err)=>{
    console.log("something wrong to connecting with mongodb atlas ",err);
})
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error in connection to mongodb"));
db.once('open',function(){
    console.log('connected to database::mongoDB');
})
module.exports=db;