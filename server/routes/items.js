module.exports = function (app) {

  var GroceryItem = require('./../models/GroceryItem.js');

  app.route('/api/items')
  .get(function (req, res) {
    GroceryItem.find(function (error, items) {
      res.send(items);
    });
  })
  .post(function (req, res) {
    console.log("Adding item...", item);
    var item = req.body;
    var groceryItem = new GroceryItem(item);
    groceryItem.save(function (error, data) {
      res.status(300).send();
    });
  });

  app.route('/api/items/:id')
  .delete(function (req, res) {
    GroceryItem.findOne({
      _id : req.params.id
    }).remove(function (item) {
      console.log("Removed...", item);
    });
  })
  .patch(function (req, res) {
    GroceryItem.findOne({
      _id: req.body._id
    }, function (error, doc) {
      for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          doc[key] = req.body[key];
        }
      }
      doc.save();
      res.status(200).send();
    });
  })
}
