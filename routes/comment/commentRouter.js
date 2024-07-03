const express = require("express");
const isLoggin = require("../../middlewares/isLoggin");
const { createComment, deleteComment, updateComment } = require("../../controllers/comments/comments");
const commentRouter = express.Router();

// create Comment
commentRouter.post("/:postId",isLoggin,createComment );


// delete Comment
commentRouter.delete("/:id", isLoggin , deleteComment);

// update Comment
commentRouter.put("/:id", updateComment);
module.exports = commentRouter;