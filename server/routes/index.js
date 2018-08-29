var express = require('express');
var router = express.Router();
const {register, login} = require('../controllers/user_controller');
/* GET home page. */
router.post('/register',register)
      .post('/login', login)
module.exports = router;
