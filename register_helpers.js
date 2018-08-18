const helpers = require('handlebars-helpers');
const layouts = require('handlebars-layouts');

module.exports = Handlebars => {
  helpers({
    Handlebars,
  });

  Handlebars = Handlebars.registerHelper(layouts(Handlebars));
  return Handlebars;
};
