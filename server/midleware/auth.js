const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/user');

const auth = (req, res, next) => {
    let token = req.headers.token
    if(token){
        let decode = jwt.verify(token, process.env.secretKey)
        User.findOne({email : decode.email})
        .then((result) => {
            req.userLogin = result
            next()
        }).catch((err) => {
            res.status(500).json({
                msg: 'you dont have acces'
            })
        });
        
    }else{
        res.status(500).json({
            msg: 'you dont have acces'
        })
        
    }

}

module.exports = auth