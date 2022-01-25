// import express 
const express = require('express');

// instanciate le serveur
const server = express();

// configure body-parser
server.use(express.json());

// import route for users
const usersRoutes = require('./routes/users');

// import route for posts
const postsRoutes = require('./routes/posts');

// import route for comments
const commentsRoutes = require('./routes/comments');

// import route for comments
const likesRoutes = require('./routes/likes');

/// Import path
const path = require('path');

// configure routes 
server.get('/' , function(req , res){
    res.setHeader('Content-type' , 'text/html');
    res.status(200).send('<h1>Bonjour sur mon serveur</h1>');
});

/// Import path for images
server.use('/images' , express.static(path.join(__dirname , 'images')));

/// tracer une route
server.use('/api' , usersRoutes);
server.use('/api/posts' , postsRoutes);
server.use('/api/comments' , commentsRoutes);
server.use('/api/likes' , likesRoutes)

// Server listen
server.listen(3307 , function(){
    console.log('serveur en ecoute !)');
})