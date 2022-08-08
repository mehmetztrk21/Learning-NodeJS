exports.getPosts = (req, res, next) => {
    res.status(200).json({ posts: [{ title: "first", content: "content first" }] });
};

exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    console.log(title,content);
    res.status(201).json({
        messge: "created.",
        post: { id: new Date().toISOString(), title: title, content: content }
    });
}