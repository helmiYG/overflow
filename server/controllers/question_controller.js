const Question = require('../models/question');
const User = require('../models/user')

module.exports = {
    insert: (req, res) => {
        const {title, content} = req.body
        Question.create({
            title: title,
            content: content,
            userId: req.userLogin._id
        })
        .then(newQ => {
            res.status(201).json({
                msg: 'insert succes',
                newQ
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    update: (req, res) => {
        const {title, content} = req.body
        Question.findOne({_id : req.params.id})
        .then((result) => {
            let idUser1 = result.userId
            let idUser2 = req.userLogin._id

            if(typeof idUser1 ==  typeof idUser2){
                    Question.updateOne({_id: req.params.id},{ $set:{title: title, content:content}})
                    .then((updatedQ) => {
                        res.status(201).json({
                            msg: 'update succes',
                            updatedQ
                        })
                    })
                    .catch((err) => {
                        res.status(400).json(err)
                    });
                } else{
                    res.status(400).json({
                        msg: 'you dont have right to update'
                    })
                }
        })
        .catch((err) => {
            res.status(400).json(err)
        });
        
    },
    deleteQ: (req, res) => {
        Question.findOne({_id: req.params.id})
        .then((result) => {
            let idUser1 = result.userId
            let idUser2 = req.userLogin._id
            if(typeof idUser1 ===  typeof idUser2){
                Question.deleteOne({_id : req.params.id})
                .then((result) => {
                    res.status(201).json({
                        msg: 'delete succes',
                        result
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        msg: 'delete failed',
                        err
                    })
                });
            }else{
                res.status(400).json({
                    msg: 'you dont have right to delete'
                })
            }
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    }, 

    read: (req, res) => {
        Question.find().populate('userId')
        .then((result) => {
           res.status(200).json(result) 
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    like: (req, res) => {
        Question.findOne({_id : req.params.id})
        .then((result) => {
            console.log(result.like.length);
            console.log(result.like);
            console.log(req.userLogin._id);
            
            console.log('masuk sisniiiiiiiiiiiiiiii ');
            let condition = true
            let msgErr = ''
            if(result.like.length > 0){
                for(var i = 0; i < result.like.length;i++){
                    if(result.like[i].idLikers === req.userLogin._id){
                        condition = false
                        msgErr = 'jangan like 2 kali'
                        break
                    }else if(result.like[i].idLikers ===result.userId){
                        condition = false
                        msgErr = 'jangan like punya sendiri'
                        break
                    }
                }
            }

            if(condition){
                let obj = { idLikers : req.userLogin._id}
                Question.updateOne({_id: req.params.id}, {$push: {like: obj}})
                    .then((result) => {
                        res.status(201).json({
                            msg: 'like succes',
                            result})
                    })
                    .catch((err) => {
                        res.status(400).json(err)
                    });
            }else{
                res.status(400).json({
                    msgErr
                })
            }
            
        })
        .catch((err) => {
            console.log(err);
            
        });
       
       
    },

    dislike: (req, res) => {
        let obj = {idDislikers: req.userLogin._id}
        Question.findOne({_id: req.params.id})
        .then((result) => {
            Question.updateOne({_id: req.params.id}, {$push : {dislike : obj}})
            .then((result) => {
                res.status(201).json(
                    {
                        msg: 'dislike succes',
                        result
                    }
                )
            })
            .catch((err) => {
                res.status(400).json(err)
            });
        })
        .catch((err) => {
            res.status(400).json(err) 
        });
        
    },

    answer: (req, res) => {
        let newA = {
            answererId: req.userLogin._id,
            answererName: req.userLogin.name,
            answerContent: req.body.answerContent

        }

        Question.updateOne({_id: req.params.id}, {$push: {answers : newA}}).populate('userId')
        .then((result) => {
            res.status(201).json({
                msg: 'answer succes',
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                msg: 'answer failed',
                err
            })
        });
    },
    readOne: (req, res)=> {
        Question.findById({_id: req.params.id}).populate('userId')
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    userQuestion: (req, res) => {
        Question.find({userId: req.userLogin._id})
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    }
};
