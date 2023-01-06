const express = require("express");
const router = express.Router();
const auth = require("../../midleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const { body, validationResult } = require("express-validator");

//@route -POST Add new post
//@access Private
router.post(
  "/posts",
  [auth, [body("text", "The text is required").notEmpty()]],
  async (req, res) => {
    console.log("from server posts", req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user,
        avatar: user.avatar,
      });
      const post = await newPost.save();
      res.send(post);
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  }
);
//@route - GET get all posts
//@access Private
router.get("/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find({}).sort("-date");
    res.json(posts);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});
//@route - GET get post by id
//@access Private
router.get("/post/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).send("Post was not found");
    res.send(post);
  } catch (err) {
    return res.status(500).send(err.msg);
  }
});
//@route - DELETE delete post by id
//@access Private
router.delete("/post/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(401).json({ msg: "Post was not found" });
    }
    console.log(post.user);
    if (req.user !== post.user.toString()) {
      return res
        .status(401)
        .json({ msg: "Only the owner can remove the post" });
    }
    await post.remove();

    res.send("Post removed!");
  } catch (err) {
    return res.status(500).send(err.msg);
  }
});

//@route - PUT add/remove post's like
//@access Private
router.put("/likes/:post_id", auth, async (req, res) => {
  /* console.log(req.user); */
  const indexRem = null;
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(401).json({ msg: "Post was not found" });
    }

    if (post.likes.filter((like) => like.user == req.user).length > 0) {
      const indxRemove = post.likes
        .map((item) => item.user.toString())
        .indexOf(req.user.toString());
      if (indxRemove == -1)
        return res.status(401).json({ msg: "Post was not found" });
      post.likes.splice(indxRemove, 1);
      await post.save();
      return res.json(post);
    }

    post.likes.unshift({ user: req.user });
    await post.save();
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.msg);
  }
});
//@route - POST add/comment to post
//@access Private
router.patch(
  "/post/comments/:post_id",
  [[body("comment", "The comment is required").notEmpty()]],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.post_id).populate({
        model: "User",
        path: "user",
        select: ["name", "avatar"],
      });

      const data = {
        comments: [
          ...post.comments,
          {
            text: req.body.comment,
            avatar: req.body.userAvatar,
            name: req.body.userName,
            user: req.body._id,
          },
        ],
      };
      Object.assign(post, data);

      await post.save();

      res.status(200).json({ msg: `Successfully updated ${post}` });
    } catch (err) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

//@route - DELETE remove comment to post
//@access Private
router.delete(
  "/post/:post_id/comment/:comment_id",
  /* auth */ async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);
      if (!post) return res.status(404).send("Post was not found!");
      const commentIndx = post.comments
        .map((comment) => comment._id.toString())
        .indexOf(req.params.comment_id.toString());

      if (commentIndx == -1)
        return res.status(404).send("Comment was not found!");
      post.comments.splice(commentIndx, 1);
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      return res.status(500).send(err.msg);
    }
  }
);
module.exports = router;
