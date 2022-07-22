const express=require("express");
const usersData=require("./users");
const router=express.Router();


router.get("/",(req,res,next)=>{
    const users=usersData.users;
    return res.render("home",{users:users,path:"/", pageTitle:"Home"});
});

module.exports=router;