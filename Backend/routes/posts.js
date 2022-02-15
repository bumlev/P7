/// import express
const express = require('express');

/// create a Router
const router = express.Router();

/// import postsCtrl
const postsCtrl = require('../controllers/postsCtrl');

// import multer 
const multer =  require('../middleware/multer-config');

/// import auth
const auth = require('../middleware/auth')

/// router for posts
router.post('/create' , auth , multer , postsCtrl.createPost);
router.get('/' , auth , postsCtrl.getAllPosts);
router.get('/recent', auth, postsCtrl.recentPosts);
router.get('/:postId/post' , auth , postsCtrl.getOnePost);
router.put('/:postId/update' , auth , multer , postsCtrl.updatePost);
router.delete('/:postDelet/delete' , auth , postsCtrl.deletePost);
module.exports = router;