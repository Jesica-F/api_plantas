const { createPost } = require("./postController")

const router = require("express").Router()

router.post("/", createPost)

module.exports = router