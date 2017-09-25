var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}));
router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;
