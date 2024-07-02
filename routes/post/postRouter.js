const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const { createPost } = require("../../controllers/posts/posts");
const postsRouter = express.Router();

// create
postsRouter.post("/", isLoggin, createPost )


module.exports = postsRouter;