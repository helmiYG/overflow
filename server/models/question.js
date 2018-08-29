const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var likeSc = new Schema({idLikers: String})
var dislikeSc = new Schema({iddislikers: String})
var answerSc = new Schema({ answererId : String, answererName : String, answerContent: String, like: Number, dislike: Number, Date : {type : Date, default : new Date()} })
var questionSchema = new Schema({
   title : {type : String, required : true},
   content : {type : String, required : true},  
   like: [likeSc],
   dislike: [dislikeSc],
   answers : [answerSc],                                                                                                                                                                                               
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

var Question = mongoose.model('Question', questionSchema);

module.exports = Question