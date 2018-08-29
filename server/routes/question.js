const router = require('express').Router()
const {insert, update, deleteQ, read, like, dislike, answer, readOne, userQuestion} = require('../controllers/question_controller');
const auth = require('../midleware/auth')


router.post('/', auth, insert)
      .get('/userQuestion',auth, userQuestion)
      .get('/',read)
      .put('/:id', auth, update)
      .delete('/:id',auth, deleteQ)
      .get('/:id', readOne)
      .put('/:id/answer', auth, answer)
      .put('/:id/like', auth, like)
      .put('/:id/dislike', auth, dislike)
module.exports = router