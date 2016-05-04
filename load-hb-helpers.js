'use strict';


var path = require("path"),
  fs = require("fs"),
  _ = require("underscore");


module.exports = function(Handlebars) {
  Handlebars = Handlebars || require("handlebars");

  // Manually loading all the handlebar-helpers because
  // it doesn't expose the Handlebars fn.
  // https://github.com/assemble/handlebars-helpers/issues/154

  var helpers = path.join.bind(null, __dirname, "lib", "helpers");

  var localHelpers = _.without(fs.readdirSync(helpers()), "helpers.js",
    'helpers-markdown.js', "helpers-code.js");

  localHelpers = localHelpers.map(function(helper) {
    return path.join(helpers(), helper);
  });


  localHelpers.map(function(helper) {
    require(helper).register(Handlebars);
  });

  return Handlebars;
}
