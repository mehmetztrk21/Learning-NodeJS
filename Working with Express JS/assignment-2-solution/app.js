const path=require("path");
const express=require("express");

const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:false}));  //gelen request ti parçalamak için.

app.use(express.static(path.join(__dirname,"public")));

const home=require("./routes/home");
const users=require("./routes/users");

app.use(home);
app.use(users)

app.use("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"views","404.html"));
});

app.listen(3000);