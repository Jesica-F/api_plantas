const Post = require("./postModel")

const createPost = (req, res) => {
    const newPost = new Post({...req.body });
    newPost.save((err, result) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(result)
        }
    })

}

module.exports = { createPost }