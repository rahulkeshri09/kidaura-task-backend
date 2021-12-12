const express=require('express');
const app=express();
const port=process.env.PORT || 80;
const cors=require('cors');
app.use(cors());
const db=require('./config/mongoose');
app.use(express.urlencoded());
app.use(express.json());
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`error in running server on ${port}`);
        return;
    }
    console.log(`Server successfully runs on port ${port}`);
})