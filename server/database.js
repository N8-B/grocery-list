var mongoose = require('mongoose');
var GroceryItem = require('./models/GroceryItem.js');

mongoose.connect('mongodb://localhost/grocery', function () {
  console.log("Connected to database.");
  // Reseeds database on each server start
  mongoose.connection.db.dropDatabase();

  var items = [
    {
      name: "Ice cream"
    },
    {
      name: "Lettuce"
    },
    {
      name: "Apples",
      purchased: true
    },
    {
      name: "Milk"
    }
  ];

  items.forEach(function (item) {
    new GroceryItem(item).save();
  });
});
