const express=require("express");

const {body}=require("express-validator");  //sunucu taraflı validasyon için.

const router=express.Router();

const feedController=require("../controllers/feed");


//GET /feed/posts
router.get("/posts",feedController.getPosts);

router.get("/post/:postId",feedController.getPost);

router.put("/post/:postId",[
    body("title").trim().isLength({min:5}),
    body("content").trim().isLength({min:5})
],feedController.updatePost);

router.post("/post",[
    body("title").trim().isLength({min:5}),
    body("content").trim().isLength({min:5})
],feedController.postPost);

router.delete("/post/:postId",feedController.DeletePost);

module.exports=router;