var path = require("path");

var Hbsc = require("./index");


var app = {
  get: function(x) {
    return this[x];
  },
  views: path.resolve("./examples/")
}

console.log(app.views);

var l = Hbsc(app);

console.log(l);