const test_email =  /^[a-zA-Z0-9_/*-+'#$%^{}]+@[a-z]+\.[a-zA-Z]+$/;
const Utils = require('../utils/jwt.utils');

exports.email_test = (req , res , next)=> {
    let valid = test_email.test(req.body.email);
   
    if(req.method == 'POST'){
        if(!valid){
            return res.status(400).json({ "email_err": "Invalid email !"});
        }
    }else{
        let headerAuth = req.headers['authorization'];
        let userisAdmin = Utils.checkAdmin(headerAuth)
        if(!valid && req.body.email !== '' && userisAdmin == 0){
            return res.status(400).json({ "email_err": "Invalid email !"});
        }
    }
   
    next();
}