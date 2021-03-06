// import express
const express = require('express');

/// import controllers for users
const usersCtrl = require('../controllers/usersCtrl');

//import email_validation
const email_validate = require('../validation/email_validation');

/// import auth
const auth = require('../middleware/auth')

// import multer 
const multer =  require('../middleware/multer-config');

/// create router for users
const router = express.Router();
router.post('/users/register' , /*email_validate.email_test*/  multer , usersCtrl.register);
router.post('/users/login' , usersCtrl.login);
router.post('/users/logout', usersCtrl.logout);
router.get('/users/' , usersCtrl.getAllUsers);
router.get('/users/:user/user' , usersCtrl.getOneUser);
router.put('/users/:userUpdate/update' , auth , email_validate.email_test , multer , usersCtrl.updateUser);
router.delete('/users/:userDelet/delete' , usersCtrl.deleteUser);

module.exports = router;