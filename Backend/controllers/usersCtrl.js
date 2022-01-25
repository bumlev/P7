/// import models
const models = require('../models');

/// import validation 
const password_validator = require('../validation/password_validator');

// Import Utils
const Utils = require('../utils/jwt.utils');

// import bcrypt 
const bcrypt = require('bcrypt');

/// import crypto
const crypto = require('crypto');

/// Register users
exports.register = (req, res) =>{

    let email = req.body.email; 
    let password = req.body.password;
    let username = req.body.username;
    let bio = req.body.bio;


    if(email == null || username == null || password == null ){
        return res.status(400).json({ 'error': "missing parameters !"});
    } 
    
    if(username.length >= 13 || username.length <= 4){
        return res.status(400).json({ 'error': "wrong username (must be 5-12) !"});
    }

    ///crypter l'email
    let crypto_email = crypto.createHash('sha256').update(email).digest('base64').substring(0, 64);

    /// validite du mot de passe 
    let error = password_validator.validate(req.body.password , { details:true });
    if(error != null){
        for(i=0;error.length;i++){
            return res.status(401).json({ message: error[i].message });
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
                    bio:bio,
                    isAdmin:0
                })
                .then( newUser => {
                    return res.status(201).json(newUser);
                })
                .catch( err =>{
                    return res.status(500).json({ err: 'user not create' });
                })
            })
           
        }else{
            return res.status(409).json({ 'error': 'user already exist !'});
        }
    })
}

/// login for users
exports.login = (req , res) =>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(email)
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
                            'token': Utils.generatedToken(userFound)
                        });
                    }else{
                        return res.status(403).json({ "error" : "Your password is incorrect !"});
                    }
            })
            .catch( err =>{
                return res.status(500).json({'error server' : 'unbale to compare passwords!'});
            })
        }else{
                return res.status(409).json({'error' : 'Your email is incorrect  !'})
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

    let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);
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
    let bio = req.body.bio;
    let username = req.body.username;

    /// crypt email 
    let crypto_email = crypto.createHash('sha256').update(email).digest('base64').substring(0, 64);
    
    models.User.findOne({
        where:{ id: req.params.userUpdate}
    })
    .then(userFound =>{
        userFound.update({
            email:(crypto_email ? crypto_email : userFound.email),
            bio:(bio ? bio : userFound.bio),
            username:(username ? username : userFound.username)
        })
        .then(userUpdated =>{
            res.status(200).json(userUpdated);
        })
        .catch( err=>{
            res.status(500).json({ 'error server' : 'unable to update user !'})
        })
    })
    .catch( err =>{
        res.status(500).json({ 'error server' : 'unable to find user !'})
    })
}

// Delete a User
exports.deleteUser = (req , res) =>{
    models.User.findOne({
        where:{id: req.params.userDelet}
    })
    .then(userFound =>{
        userFound.destroy()
        .then(userDeletd =>{
            res.status(200).json({"message" : "user " + userDeletd.username + ' is deleted '});
        })
        .catch( err =>{
            res.status(500).json({" error server" : "unable to delete a user "});
        })
    })
}

