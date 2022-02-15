/// import models
const models = require('../models');

/// import validation 
const password_validator = require('../validation/password_validator');

// Import Utils
const Utils = require('../utils/jwt.utils');

// import bcrypt 
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

/// import crypto
const crypto = require('crypto');
const { JsonWebTokenError } = require('jsonwebtoken');

/// Register users
exports.register = (req, res) =>{

    let email = req.body.email; 
    let password = req.body.password;
    let username = req.body.username;
    let bio = req.body.bio;

    if(email == '' || username == '' || password == '' ){
        return res.status(400).json({ 'error': "missing parameters !"});
    } 
    
    if(username.length >= 13 || username.length <= 4){
        return res.status(400).json({ 'username_err': " wrong username (must be 5-12) !"});
    }

    ///crypter l'email
    let crypto_email = crypto.createHash('sha256').update(email).digest('base64').substring(0, 64);

    /// validite du mot de passe 
    let error = password_validator.validate(req.body.password , { details:true });
    if(error != null){
        for(i=0;error.length;i++){
            return res.status(401).json({ 'password_err': error[i].message});
        }
    }

     /// find first your email 
    models.User.findOne({
        where:{email : crypto_email}
    })
    .then(userFound =>{
        if(!userFound){
            bcrypt.hash(password , 5)
            .then(hashPassword =>{
                models.User.create({
                    email:crypto_email,
                    password:hashPassword,
                    username:username,
                    attachment:(req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),
                    bio:bio,
                    isAdmin:0
                })
                .then( newUser => {
                    if(newUser){
                        models.User.findAll()
                        .then( users =>{
                            if(users && users !== null & users.length === 1){
                                newUser.update({
                                  isAdmin:1  
                                });
                            }
                        })
                        return res.status(201).json(newUser);
                    } 
                })
                .catch( err =>{
                    return res.status(500).json({ 'error_server': 'user not create' });
                })
            })
           
        }else{
            return res.status(409).json({ 'error': 'user already exist !'});
        }
    })
    .catch( err =>{
        return res.status(500).json({ 'error_server': 'unable to create a user !' });
    })
}

/// login for users
exports.login = (req , res) =>{
    let email = req.body.email;
    let password = req.body.password;
    
    /// check if email and password is filled 
    if(email == null || password == null){
        return res.status(400).json({ "error" : "missing parameters !"});
    }

    /// crypt email 
    let crypto_email = crypto.createHash('sha256').update(email).digest('base64').substring(0, 64);
   
    // console.log(password + ' | ' + crypto_email);

    // Authentification for User
    models.User.findOne({
        where:{ email : crypto_email }
    })
    .then(userFound => {
        if(userFound){
            bcrypt.compare(password , userFound.password)
            .then(confirmUser =>{
                    if(confirmUser){
                        res.status(200).json({ 
                            "userId" : userFound.id,
                            "userisAdmin":userFound.isAdmin,
                            'username':userFound.username,
                            'bio':userFound.bio,
                            'token': Utils.generatedToken(userFound)
                        });
                    }else{
                        return res.status(403).json({ "password_err" : "Your password is incorrect !"});
                    }
            })
            .catch( err =>{
                return res.status(500).json({'error' : 'unbale to compare passwords!'});
            })
        }else{
                return res.status(409).json({'email_err' : 'Your email is incorrect  !'})
        }
    })
    .catch(err =>{
            return res.status(500).json({ 'error' : 'user not able to log in !'});
    })
}

/// Get All Users
exports.getAllUsers = (req , res) =>{
    models.User.findAll({
        include:[{
            model:models.Post
        }]
    })
    .then(users =>{
        res.status(200).json(users);
    })
    .catch( err =>{
        return res.status(500).json({ 'error' : 'unable to display all users !'});
    })
}

// to get One User 
exports.getOneUser = (req, res) =>{

    /*let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);*/
    models.User.findOne({
        where : { id : req.params.user}
    })
    .then(user =>{
        res.status(200).json(user);
    })
}

/// To Update a User
exports.updateUser = (req , res) => {
    /*let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);*/

    /// get Data
    let email = req.body.email;
    let password = req.body.password;
    let bio = req.body.bio;
    let username = req.body.username;
    let isAdmin = req.body.isAdmin;

    bcrypt.hash(password , 5)
    .then((hash)=>{ 
        /// crypt email 
        let crypto_email = undefined
        if( email != '')
            crypto_email = crypto.createHash('sha256').update(email).digest('base64').substring(0, 64);
        
        models.User.findOne({
            where:{ id: req.params.userUpdate}
        })
        .then(userFound =>{
                userFound.update({
                    email:(email !='' ? crypto_email : userFound.email),
                    password:(password !='' ? hash: userFound.password),
                    bio:(bio !='' ? bio : userFound.bio),
                    username:(username  !='' ? username : userFound.username),
                    isAdmin:isAdmin
                })
                .then(userUpdated =>{
                    res.status(200).json(userUpdated);
                })
                .catch( err=>{
                    res.status(500).json({ 'error' : 'unable to update user !'})
                })
            })
            .catch( err =>{
                res.status(500).json({ 'error' : 'unable to find user !'})
            })
    })
    
}

// Delete a User
exports.deleteUser = (req , res) =>{
    models.User.findOne({
        where:{id: req.params.userDelet}
    })
    .then(userFound =>{
        console.log(userFound.username)
        userFound.destroy()
        .then(userDeleted =>{
            res.status(200).json({"message" : "user " + userDeleted.username + ' is deleted '});
        })
        .catch( err =>{
            res.status(500).json({"error" : "unable to delete a user "});
        })
    })
}

/// logout as a user
exports.logout = (req , res , next) =>{
    req.headers.authorization = null;
    res.status(201).json({message: "you are logout !"});
}

