const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SIGN_SECRET = "Lwpa8|Mtre/@KTjdRAOlDpRo6{BvpBLAY26f/w1_v.9KP(C5Qihw,#)~vRCT&S;";
module.exports = (req , res , next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token , JWT_SIGN_SECRET);
        const userId = decodedToken.userId;
        next();
    }catch(error){
        res.status(401).json({ error: 'Requete non authentifiee !' });
    }
}