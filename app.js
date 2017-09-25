var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var Sequelize = require('sequelize');
var router = require('./routes');

// requires db
var models = require('./models');

// tells express to use nunjucks' template
var env = nunjucks.configure('views', {noCache: true});

// tells express to use html
app.set('view engine', 'html');
// tells express to use html, using nunjucks
app.engine('html', nunjucks.render);

app.use(morgan('tiny'));

app.get('/', function(req, res, next) {
  res.send('Hello April');
});

app.use('/', router);
// call .sync on each model and Sequelize will run against our db to create the tables and columns
models.db.sync()
.then(function () {
  app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
  });
})
.catch(console.error);
