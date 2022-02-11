const test_email =  /^[a-zA-Z0-9_/*-+'#$%^{}]+@[a-z]+\.[a-zA-Z]+$/;
exports.email_test = (req , res , next)=> {
    /// Validite de l'email
    let valid = test_email.test(req.body.email);
    if(!valid){
        return res.status(400).json({ "email_err": "Invalid email !"});
    }
    next();
}