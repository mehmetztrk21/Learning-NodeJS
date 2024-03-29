const express=require("express");

const {body}=require("express-validator");  //sunucu taraflı validasyon için.

const router=express.Router();

const feedController=require("../controllers/feed");

const isAuth=require("../middleware/is-auth");

//GET /feed/posts
router.get("/posts",isAuth,feedController.getPosts);

router.get("/post/:postId",isAuth,feedController.getPost);

router.put("/post/:postId",isAuth,[
    body("title").trim().isLength({min:5}),
    body("content").trim().isLength({min:5})
],feedController.updatePost);

router.post("/post",isAuth,[
    body("title").trim().isLength({min:5}),
    body("content").trim().isLength({min:5})
],feedController.postPost);

router.delete("/post/:postId",isAuth,feedController.deletePost);

module.exports=router;