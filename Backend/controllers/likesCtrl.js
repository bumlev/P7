///  import models
const models = require('../models');

// import Utils 
const Utils = require('../utils/jwt.utils');

// Constants
const LIKED = 1;
const DISLIKED = 0;

/// Like a Post 
exports.likePost = (req , res) => {

    // Get UserId 
    let headerAuth = req.body.headers['Authorization'];
    let userId = Utils.GetUserId(headerAuth);
   
    // Get postId
    let postId = req.params.postId;
    /// Check if postId <=0
    if(postId <= 0 ) {
        return res.status(400).json({"error" : "invalid post !"})
    }

    /// Get like by using sql request
    models.Post.findOne({
        where:{ id : postId },
    })
    .then( postFound => {
        if(postFound){
            models.User.findOne({
                where:{ id : userId }
            })
            .then( userfound => {
                if(userfound){
                    models.Like.findOne({
                        where:{ 
                            userId : userfound.id,
                            postId : postFound.id
                        }
                    })
                    .then(isUserAlreadyLikedFound => {
                        
                        if(!isUserAlreadyLikedFound){
                            postFound.addUser(userfound , { through: { isLike: LIKED } })
                            .then( alreadyLikeFound => {
                                if(alreadyLikeFound) {
                                    postFound.update({
                                        likes : postFound.likes + LIKED
                                    })
                                    .then( postFound =>{
                                        if(postFound){
                                            return res.status(200).json(postFound);
                                        }else{
                                            return res.status(409).json({ "error server" : "this post is not updated !"});
                                        }
                                    })
                                }else{
                                    return res.status(409).json({ " error " : "pivot table  not created !"})
                                }
                            })
                            .catch( err =>{
                                return res.status(500).json({"error server" : " unable to set user reaction !"});
                            })
                        }else{
                            if(isUserAlreadyLikedFound.isLike == DISLIKED){
                                isUserAlreadyLikedFound.update({
                                    isLike :  LIKED   
                                })
                                .then( LikedFound =>{
                                    if(LikedFound){
                                        postFound.update({
                                            likes:postFound.likes + LIKED
                                        })
                                        .then( postFound =>{
                                            if(postFound)
                                                return res.status(200).json(postFound);
                                        })
                                    }
                                })
                                .catch( err =>{
                                    return res.status(500).json({"error server" : "Unable to update Like !"});
                                })
                            }else{
                                return res.status(409).json({"error server" : "This post already Liked !"});
                            }  
                        }
                    })
                    .catch( err =>{
                        return res.status(500).json({ " error server " : "unable to find a post Liked !"});
                    })
                }else{
                    return res.status(409).json({" error " : " user not found !"}); 
                }
            })
        }else{
            return res.status(409).json({" error " : " post not found !"});
        }
    })
    .catch( err =>{
        return res.status(500).json({" error server " : " unable to find post !"});
    })
}


/// To dislike a post 
exports.dislikePost = (req , res) =>{

    /// To Get userId
    let headerAuth = req.body.headers['Authorization'];
    let userId = Utils.GetUserId(headerAuth);

    /// To get postId
    let postId = parseInt(req.params.postId);
   
    /// Check if postId <=0
    if(postId <= 0 ) {
        return res.status(400).json({"error" : "invalid post !"})
    }
    
    /// Get like by using sql request
    models.Post.findOne({
        where:{ id : postId },
    })
    .then(postFound =>{
        if(postFound){
            models.User.findOne({
                where:{ id : userId}
            })
            .then( userfound =>{
                if(userfound){
                   
                    models.Like.findOne({
                        where:{
                            userId: userfound.id,
                            postId:postFound.id
                        }
                    })
                    .then( isUserAlreadyLikeFound => {
                        if(!isUserAlreadyLikeFound){
                            postFound.addUser(userfound , {through : {isLike: DISLIKED} })
                            .then(alreadyLikeFound =>{
                                if(alreadyLikeFound){
                                    return res.status(200).json(alreadyLikeFound);
                                }else{
                                    return res.status(409).json({ "error " : "Post not Liked !"});
                                }
                            })
                            .catch( err =>{
                                return res.status(500).json({ " error server " : "unable to Like a post !"});
                            })
                        }else{
                            if(isUserAlreadyLikeFound.isLike == LIKED){
                                isUserAlreadyLikeFound.update({
                                    isLike:DISLIKED
                                })
                                .then(LikedFound =>{
                                    if(LikedFound){
                                        postFound.update({
                                            likes:postFound.likes - LIKED
                                        })
                                        .then( postDislikeFound =>{
                                            if(postDislikeFound){
                                                return res.status(200).json(postDislikeFound);
                                            }else{
                                                return res.status(409).json({"error " : "Post is not updated !"})
                                            }
                                        })
                                        .catch( err =>{
                                            return res.status(500).json({"error server" : "Unable to update a post !"});
                                        })
                                    }else{
                                        return res.status(409).json({"error " : "Post is not disliked !"});
                                    }
                                })
                                .catch( err =>{
                                    return res.status(500).json({"error" : "Unable to dislike a post !"});
                                })
                            }else{
                                return res.status(409).json({"error" : "This post is already disLiked !"});
                            }
                        }
                    })
                    .catch( err =>{
                        return res.status(500).json({" error server " : "Unable to check if a post is liked !"});
                    })
                    
                }else{
                    return res.status(409).json({"error" : "user not found !"});  
                }
            })
            .catch( err =>{
                return res.status(500).json({ " error server" : "unable to find a user !"});
            })
        }else{
            return res.status(409).json({"error" : "post not found !"});
        }
    })
    .catch( err=>{
        return res.status(500).json({ "error server " : "unable to find a post !"});
    })    
}