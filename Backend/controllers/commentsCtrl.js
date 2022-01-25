/// Import models
const models = require('../models');

/// Import Utils 
const Utils = require('../utils/jwt.utils');

// constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT= 4;

/// create comment
exports.createComment = (req , res) =>{
    let headerAuth = req.headers['authorization'];
    let userId = Utils.GetUserId(headerAuth);

    /// get postId by using params.
    let postId = req.params.postId;

    /// Get Data
    let content = req.body.content;
    if(content == null || content == ''){
        return res.status(400).json({"error " : " Your input is empty !"});   
    }
   
    /// get postId by using sql request
    models.Post.findOne({
        where: { id : postId }
    })
    .then( post => {
        if(post){
            models.User.findOne({
                where:{id : userId}
            })
            .then(userFound =>{
                if(userFound){
                    models.Comment.create({
                        PostId:post.id,
                        UserId:userFound.id,
                        content:content
                    })
                    .then( newComment =>{
                        res.status(200).json(newComment);
                    })
                    .catch( err =>{
                        res.status(500).json({ "error " : "unable to create a user !"});
                    })
                }else{
                    res.status(409).json({ "error " : " user not found !" });   
                }
            })
            .catch( err =>{
                res.status(500).json({ "error server" : "unale to find post !"})
            })
        }else{
           res.status(409).json({ "error " : "post not found !" }); 
        }
    })
    .catch( err =>{
        res.status(500).json({ "error server" : "unale to find post !"})
    })
},


/// Display Comments
exports.getAllComments = (req , res) =>{

    models.Comment.findAll({
        include:{
            model:models.User,
            as:'user',
            attributes:['username']
        }
    })
    .then( comments => {
        if(comments){
            res.status(200).json(comments);
        }else{
            res.status(409).json({"error" : " No comments ..."});
        }
    })
    .catch( err =>{
        res.status(500).json({ "error server" : "unable to find all comments !"});
    })
}


/// Update comment
exports.getOnecomment = (req , res) => {

    //Get commentId by using params
    let commentId = req.params.commentId;

    /// Get comment by using sql request
    models.Comment.findOne({
        where:{ id:commentId },
        attributes:['id' , 'UserId', 'content']
    })
    .then( comment => {
        if(comment){
            res.status(200).json(comment);
        }else{
            res.status(409).json({"error" : " comment not found ..."});
        }
    })
    .catch( err =>{
        res.status(500).json({"error server" : "unable to find a comment !"});
    })
}

/// Update a comment
exports.updateComment = (req , res) => {
    // Get commentId by using pamas
    let commentId = req.params.commentId;

    /// Get Data
    let content = req.body.content;

    /// Check if Data is empty
    if(content == '' || content == null ){
        return res.status(400).json({"error " : " Your input is empty !"});
    }
    
    /// Update comment 
    models.Comment.findOne({
        where:{ id: commentId },
        attributes:['id' , 'content']
    })
    .then( comment => {
        if(comment){
            comment.update({
                content:(content ? content : comment.content)
            })
            .then( updatedComment =>{
                if(updatedComment){
                    res.status(200).json(updatedComment);
                }else{
                    res.status(409).json({"error" : "Comment not updated !"})
                }
            })
            .catch( err =>{
                res.status(500).json({ "error server" : "Unable to update a comment !"});
            })
        }else{
            res.status(409).json({ "error" : "Comment not found ..."});
        }
    })
    .catch( err =>{
        res.status(500).json({ "error server" : " Unable to find a comment !"});
    })
}


/// Delete a comment
exports.deleteComment = (req , res) =>{

    /// Get commentId 
    let commentId = req.params.commentId;

    // Find one comment by using sql request
    models.Comment.findOne({
        where:{ id : commentId }
    })
    .then( comment => {
        if( comment && comment != null ){
            comment.destroy()
            .then( deletedComment => {
                if(deletedComment){
                    return res.status(200).json({"message" : "Your comment is deleted !"});
                }else{
                    return res.status(409).json({ "error" : "deletedComment not found..."});
                }
            })
            .catch( err =>{
                return res.status(500).json({"error server" : " unable to delete a comment !"});
            })
        }else{
            return res.status(409).json({ "error " : "This comment not found ..."});
        }
    })
    .catch( err => {
        return res.status(500).json({"error" : "unable to find a comment !"});
    })
}




