// import express
const express = require('express');

/// create a Router
const router = express.Router();

/// import controller for likes/dislikes
const likesCrtl = require('../controllers/likesCtrl');


// Routes for Likes
router.post('/:postId/like' , likesCrtl.likePost);
router.post('/:postId/dislike' , likesCrtl.dislikePost);

module.exports = router;