const express = require ("express")
require("./src/db.connnection")
const http = require("http")
const router = require("./src/routing")


const auth=express()
const httpServer=http.createServer(auth)

const {MongooseError}=require('mongoose')

auth.use(express.json())

auth.use('/auth',router)

auth.use((req, res, next) => {
    res.status(404).json({
      result: {},
      message: "You have entered the wrong URL",
      meta: null
    });
  });

  auth.use((err,req,res,next)=>{
    console.log("Garbage Collector",err)

    let code=err.code || 500;
    let data=err.data || {}
    let message=err.message ||"SERVER ERROR"

    console.log(err)
    
    if(err.code===11000){
        const keys=Object.keys(err.keyPattern)
        console.log({keys})
        keys.map((fieldName)=>{
            data[fieldName]=fieldName+"should be unique"
        })
        message="validation failed",
        code=422
    }

    res.status(code).json({
        result:data,
        message:message,
        meta:null
    })
})

httpServer.listen(3030,"127.0.0.1",(err)=>{
    if(!err){
        console.log("Server has started")
    }
    else{
        console.log("Err",err)
    }
})

