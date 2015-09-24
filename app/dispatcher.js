var uuid = require('node-uuid');
var listeners = {};

module.exports = {
  register: function (cb) {
    var id = uuid.v1();
    listeners[id] = cb;
    return id;
  },
  dispatch: function (payload) {
    console.info("Dispatching...", payload);
    for (var id in listeners) {
      if (listeners.hasOwnProperty(id)) {
        var listener = listeners[id];
        listener(payload);
      }
    }
  }
};
