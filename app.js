var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');

// tells express to use nunjucks' template
var env = nunjucks.configure('views', {noCache: true});
// tells express to use html
app.set('view engine', 'html');
// tells express to use html, using nunjucks
app.engine('html', nunjucks.render)


app.get('/', function(req, res, next) {
  res.send('Hello April')
})




// starts the server - gets localhost/1337 running
// var server = app.listen(1337, function() {
//   console.log('listening to port 1337');
// });
