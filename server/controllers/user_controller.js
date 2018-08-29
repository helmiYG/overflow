const User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
let jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    register: (req, res) => {
        console.log('masuk')
        const {name, email, password} = req.body
        var hash = bcrypt.hashSync(password, salt);
        User.create({
            name: name,
            email: email,
            password: hash
        })
        .then((result) => {
            res.status(201).json({
                msg: 'succes register',
                result: result
            })
        })
        .catch((err) => {
            
            res.status(400).json({
                msg :'email duplicated / value is null',
                err}) 
        });
    },
    login: (req, res) =>{
        console.log('masuk login');
        
        const {email, password} = req.body
        User.findOne({email : email})
        .then((userLogin) => {
            if(userLogin){
                let passwordEncrypted = bcrypt.compareSync(password, userLogin.password);
                if(passwordEncrypted){
                    let token = jwt.sign({
                        id : userLogin._id,
                        email: userLogin.email,
                        name : userLogin.name
                    }, process.env.secretKey)
                    
                    res.status(201).json({
                        msg: 'login succes',
                       token
                    })
                }else{
                    res.status(400).json({
                        msg: 'password wrong',
                    })
                }
            }else{
                res.status(400).json({
                    msg: 'email wrong / you not registered yet',
                    err
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                msg: 'email wrong / you not registered yet',
                err
            })
        });
    },
};
