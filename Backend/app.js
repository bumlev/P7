// import express 
const express = require('express');

// instanciate le serveur
const app = express();

// configure body-parser
app.use(express.json());

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
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/// Import path for images
app.use('/images' , express.static(path.join(__dirname , 'images')));

/// tracer une route
app.use('/api' , usersRoutes);
app.use('/api/posts' , postsRoutes);
app.use('/api/comments' , commentsRoutes);
app.use('/api/likes' , likesRoutes)

module.exports = app;