const path=require("path");
const bodyParser=require("body-parser");
const express=require("express");
const { appendFile } = require("fs");

const router=express.Router();

router.get("/add-user",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"../","views","add-user.html"));
    console.log(req.body);
});

router.post("/users",(req,res,next)=>{
    console.log(req.body);
    res.status(200).sendFile(path.join(__dirname,"../","views","users.html"));
});


module.exports=router;