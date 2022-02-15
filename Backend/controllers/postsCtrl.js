/// Import models
const models = require('../models');

/// Import Utils 
const Utils = require('../utils/jwt.utils');

/// Import fs
const fs = require('fs');
const { Console } = require('console');

// constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT= 4;

/// Create Post
exports.createPost = (req , res) => {
    let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);
    /// Get data
    let title = req.body.title;
    let content = req.body.content;
    console.log(title);
    /// Check your input
    if(title == null || content == null){
        return  res.status(400).json({ 'error': 'missing paremeters !'});
    }
    if(title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT){
        return res.status(400).json({' error': 'invalid paremeters !'});
    }

    models.User.findOne({
        where:{id : userId}
    })
    .then(userFound =>{
   
        if(userFound){
            models.Post.create({
                title:title,
                content:content,
                attachment:(req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),
                likes:0,
                Vu:0,
                UserId:userFound.id
            })
            .then(post =>{
                res.status(201).json(post);
            })
        }else{
            res.status(409).json({ "error" : "You are not registered as user !"})
        }
    })
    .catch( err =>{
        res.status(500).json({ "error server " : " unable to find a user !"});
    })
}


/// To display all Posts
exports.getAllPosts = (req , res) =>{

    models.Post.findAll({
        include:[
            {
                model:models.User,
                as:'user',
                attributes:['username' , 'id'],
            },
            {
                model:models.Comment,
                as:'comments',
                attributes:['content'],
                include:{
                    model:models.User,
                    as:'user',
                    attributes:['username']
                }
            },
            {
                model:models.Like,
                as:'liks'
                
            }
        ],
        order:[
            ['id' , 'DESC']
        ]
    })
    .then( posts =>{
        if(posts){
            res.status(200).json(posts);
        }else{
            res.status(400).json({'error' : 'No users ....'});
        }
    })
    .catch( err =>{
        res.status(500).json({ 'error' : 'unabe to display all posts !'});
    })

}

/// to get One Post
exports.getOnePost = (req , res) =>{
    let postId = req.params.postId;

    // get one post
    models.Post.findOne({
        where:{ id: postId },
        include:[
            {
                model:models.User,
                as:'user',
                attributes:['username']
            },
            {
                model:models.Comment,
                as:'comments',
                attributes:['content'],
                include:{
                    model:models.User,
                    as:'user',
                    attributes:['username' , 'bio']
                } 
            },
            {
                model:models.Like,
                as:'liks'
                
            }
        ]   
    })
    .then( post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(400).json({"error" : "This post no longer exists !"})
        }
    })
    .catch( err => {
        res.status(500).json({ "error server" : "unable to to find one post"});
    })
}

// to Update Post
exports.updatePost = (req , res) =>{
    /// Get aut_userId
    let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);
    console.log(req.headers);
    /// Get Data
    let title = req.body.title;
    let content = req.body.content; 
    if(title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT){
        return res.status(400).json({' error': 'invalid paremeters !'});
    }

    // Get postId
    let postId = req.params.postId;
    postId = Number(postId);

    if(postId <= 0){
        return res.status(400).json({' error': 'invalid value of paremeter !'});
    }
 
    // Get post id by sql request
    models.Post.findOne({
        where:{ 
            id : postId,
            UserId: userId
        }
    })
    .then( post => {
        if(post){
            if(req.file) {
                if(post.attachment != null){
                    let filename = post.attachment.split('/images')[1];
                    fs.unlink(`images/${filename}` , () => {
                        post.update({
                            title:(title ? title : post.title),
                            content:(content ? content : post.content),
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        })
                        .then( postUpdated => {
                            if(postUpdated){
                                res.status(200).json(postUpdated);
                            }
                            else{
                                res.status(400).json({ "error" : "post not updated "});
                            }
                        })
                        .catch( err => {
                            return res.status(500).json({ "error server " : "unable to update post !"});
                        })
                    })
                }else{
                    post.update({
                        title:(title ? title : post.title),
                        content:(content ? content : post.content),
                        attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                    .then( postUpdated => {
                        if(postUpdated){
                            res.status(200).json(postUpdated);
                        }
                        else{
                            res.status(400).json({ "error" : "post not updated "});
                        }
                    })
                    .catch( err => {
                        return res.status(500).json({ "error server " : "unable to update post !"});
                    })
                }  
            }else{
                post.update({
                    title:(title ? title : post.title),
                    content:(content ? content : post.content),
                })
                .then( postUpdated =>{
                    if(postUpdated){
                        res.status(200).json(postUpdated);
                    }
                    else{
                        res.status(400).json({ "error" : "post not updated "});
                    }
                })
                .catch( err =>{
                    res.status(500).json({ "error server " : "unable to update post !"});
                })
            }
        }else{
            res.status(409).json({ "error" : "You are not authorised to update this post !"});
        }
        
    })
    .catch( err =>{
        res.status(500).json({" error server " : " unable to find post ! "});
    })
    
}

/// To delete a Post 
exports.deletePost = (req , res) => {

    /// Get aut_userId
    let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);

    /// Get postId at the same time check if a user registered this post
    models.Post.findOne({
        where:{ 
            id: req.params.postDelet,
            UserId:userId
        }
    })
    .then( post => {
        if(post){
           
            
            if(post.attachment !== null){
                let filename = post.attachment.split('/images')[1];
                fs.unlink(`images/${filename}` , () =>{
                    
                    post.destroy()
                    .then(postDeletd => {
                        res.status(200).json({"message" : "post " + postDeletd.title + ' is deleted '});
                    })
                    .catch( err =>{
                        res.status(500).json({" error" : "unable to delete a post "});
                    })
                })
            }else{
                    post.destroy()
                    .then(postDeletd => {
                        res.status(200).json({"message" : "post " + postDeletd.title + ' is deleted '});
                    })
                    .catch( err =>{
                        res.status(500).json({" error" : "unable to delete a post "});
                    })
            }
            
        }else{
            return res.status(409).json({"error" : " You are not authorised to delete this post !"});
        }
    })
}

// find recent_post
exports.recentPosts =(req, res , next) =>{

    models.Post.findAll({
        where:{
            Vu:0
        },
        include:[
            {
                model:models.User,
                as:'user',
                attributes:['username'],
            },
            {
                model:models.Comment,
                as:'comments',
                attributes:['content'],
                include:{
                    model:models.User,
                    as:'user',
                    attributes:['username']
                }
            },
            {
                model:models.Like,
                as:'liks'
                
            }
        ],
        order:[
            ['id' , 'DESC']
        ]
        
    })
    .then( posts =>{
        if(posts){
            models.Post.increment({ Vu:1 } , {where:{Vu:0}})
            res.status(200).json(posts)
        }
    })
    .catch( err=>{
        res.status(500).json({"error" : "unable to find recent posts !"});
    })
}