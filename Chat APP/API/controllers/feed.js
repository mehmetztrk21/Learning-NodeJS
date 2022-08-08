const { validationResult } = require("express-validator");
const Post = require("../models/posts");

const fs = require("fs");
const path = require("path");
const { post } = require("../routes/feed");

exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        res.status(200).json({
            posts: posts,
            message: "Fetched post succesfull."
        });
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);  //hata olursa bul ve diğer katmana ile (app.js de)
        })
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId).then(post => {
        if (!post) {
            const error = new Error("Post no found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Post fetched", post: post });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);  //hata olursa bul ve diğer katmana ile (app.js de)
    })
}


exports.postPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation error");
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path.replace("\\", "/");
    const post = new Post({ title: title, content: content, imageUrl: imageUrl, creator: { name: "Mehmet" } });
    post.save().then(result => {
        res.status(201).json({
            messge: "created.",
            post: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);  //hata olursa bul ve diğer katmana ile (app.js de)
    })
};
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path.replace("\\", "/");
    }
    if (!imageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl);
            }
            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Post updated!', post: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.DeletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByIdAndDelete(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            clearImage(post.imageUrl);
            console.log(post);
            res.status(200).json({ message: 'Post deleted!' });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

const clearImage = filePath => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, err => {
        console.error(err);
    })
}