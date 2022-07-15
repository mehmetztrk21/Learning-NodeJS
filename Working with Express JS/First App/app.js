const http = require("http"); 

const express=require("express");

const app=express();

//her app.use bir ara katman oluşturuyor. (middleware).

app.use((req,res,next)=>{
    console.log("in the middleware");
    next();  //next diyerek diğer middleware ye geçiyoruz. (yani alttaki.)
});

app.use((req,res,next)=>{
    console.log("in the another middleware");
    res.send("<h1>Hello from Express</h1>");
});


app.listen(3000); 