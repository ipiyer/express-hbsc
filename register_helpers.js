const helpers = require('handlebars-helpers');
const layouts = require('handlebars-layouts');

module.exports = handlebar => {
  Handlebars.registerHelper(layouts(handlebars));
  helpers({
    handlebars,
  });
  return handlebar;
};
