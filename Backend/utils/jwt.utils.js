/// import jsonwebtoken 
const jwt = require('jsonwebtoken');

/// get sign secret key
const JWT_SIGN_SECRET = "Lwpa8|Mtre/@KTjdRAOlDpRo6{BvpBLAY26f/w1_v.9KP(C5Qihw,#)~vRCT&S;";

// generate token
exports.generatedToken = (userData) =>{
    return jwt.sign({
        userId:userData.id,
        userisAdmin:userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
       expiresIn:'24h' 
    });
}

///to parse authorization
exports.parseAuthorization = (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer' , '') :null;
}

/// To Get UserId
exports.GetUserId = (authorization) =>{
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization).split(' ')[1];
    if(token != null){
        try{
            let jwtToken = jwt.verify(token , JWT_SIGN_SECRET);
            if(token != null){
                userId = jwtToken.userId;
                return userId;
            }
        }catch(err){
            return err;
        }   
    }
}