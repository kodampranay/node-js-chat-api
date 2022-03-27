import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './userRoutes/user.js'
import fileUpload from 'express-fileupload'

import cors from 'cors'



dotenv.config();
const app=express();
app.use(cors({origin: '*',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))

app.use(express.json())


const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
    
  console.log(nDate);



//online users



//STATIC PATH FOR IMAGES
app.use(express.static("public"));
app.use("/uploads", express.static("uploads/webp"));


const PORT=process.env.PORT;
const DB=process.env.DB;

//CONNECTING TO DATABASE
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true}).then((res)=>console.log('connected to db')).catch((err)=>console.log(err));

app.use(fileUpload());
// ROUTERS MIDDLWARE
app.use('/',userRouter) 


app.listen(PORT,()=>console.log(`server is running at http://localhost:`+PORT))
