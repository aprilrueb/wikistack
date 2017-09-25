var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', function(req, res, next) {
  res.redirect('got to GET /wiki/');
});

wikiRouter.get('/add', function(req, res) {
  res.render('addpage');
});

wikiRouter.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.pagecontent
  });
  console.log(page.urlTitle);
  page.save();
  res.redirect('/');
});

module.exports = wikiRouter;
