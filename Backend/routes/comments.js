/// import express
const express = require('express');

/// create a Router
const router = express.Router();

/// import postsCtrl
const commentsCtrl = require('../controllers/commentsCtrl');

/// Routes for comments
router.post('/:postId/create' , commentsCtrl.createComment);
router.get('/' , commentsCtrl.getAllComments);
router.get('/:commentId/comment' , commentsCtrl.getOnecomment);
router.put('/:commentId/update' , commentsCtrl.updateComment);
router.delete('/:commentId/delete' , commentsCtrl.deleteComment);

module.exports = router;