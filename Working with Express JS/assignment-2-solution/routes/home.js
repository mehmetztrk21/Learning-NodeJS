var path=require("path");

const express=require("express");

const router=express.Router();

router.get("/",(req,res,next)=>{
    res.status(202).sendFile(path.join(__dirname,"../","views","home.html"));
});


module.exports=router;