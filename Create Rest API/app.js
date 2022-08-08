const express =require("express");

const feedRoutes=require("./routes/feed");

const bodyParser=require("body-parser");
//app.use(bodyParser.urlencoded());

const app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{  //CORS hatsının önüne geçmek için apiye erişimi böyle düzenliyoruz.
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Headers","Content-Type","Authorization");
    next();
})


app.use("/feed",feedRoutes);

app.listen(8080);