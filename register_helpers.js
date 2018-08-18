const helpers = require('handlebars-helpers');
const layouts = require('handlebars-layouts');

module.exports = Handlebars => {
  Handlebars = Handlebars.registerHelper(layouts(Handlebars));
  helpers({
    Handlebars,
  });
  return Handlebars;
};
