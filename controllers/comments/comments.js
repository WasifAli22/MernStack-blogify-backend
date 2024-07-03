const asyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comments");
const Post = require("../../model/Post/Post");

//@desc  Create a comment
//@route POST /api/v1/comments/:postId
//@access Private

exports.createComment = asyncHandler(async (req, res) => {
  //get the payload
  const { text, author } = req.body;
  //get post id from params
  const postId = req.params.postId;
  //* Create comment
  const comment = await Comment.create({
    text,
    author: req.userAuth._id,
    postId,
  });
  //Associate comment to a post
  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  //send the response
  res.json({
    status: "success",
    message: "Comment created successfully",
    comment,
  });
});

//@desc  Delete comment
//@route DELETE /api/v1/comments/:id
//@access Private

exports.deleteComment = asyncHandler(async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Comment successfully deleted",
  });
});

//@desc  update comment
//@route PUT /api/v1/comments/:id
//@access Private

exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    message: "comment successfully updated",
    comment,
  });
});