// server.js
// Load the dependencies we need
var express = require('express');
var app = express();
var parser = require('body-parser');
var React = require('react');
var GroceryItem = require('./models/GroceryItem.js');
require('babel/register');
require('./database.js');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set up parsing for json and urlencoded for post requests
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// ROUTES
// Index page
app.get('/', function (req, res) {
  // res.render('./../app/index');
  var application = React.createFactory(require('./../app/components/GroceryItemList.jsx'));
  GroceryItem.find(function (error, doc) {
    var generated = React.renderToString(application({
      items: doc
    }));
  res.render('./../app/index.ejs', {reactOutput: generated});
  });
})
.use(express.static(__dirname + '/../.temp'));
// api route
require('./routes/items.js')(app);

// SERVER
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
