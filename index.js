const path = require('path');
const fs = require('fs');

const helpers = require('./register_helpers');

function HBarsC({ templates, Handlebars }) {
  if (!Handlebars) {
    throw new Error('Handlebars instance missing');
  }

  const isProduction = process.env.NODE_ENV.toLowerCase() === 'production';

  // register all the helpers
  helpers(Handlebars);

  const partial = fpath => {
    const content = compile(path.join(templates, `${fpath}.hbs`));
    // partials has to be registered
    Handlebars.registerPartial(fpath, content);
  };

  const compile = file => {
    if (Handlebars.templates && Handlebars.templates[file]) {
      return Handlebars.templates[file];
    }
    const content = fs.readFileSync(file, {
      encoding: 'utf8',
    });
    if (isProduction) {
      // expect the templates to be compiled.
      // so eval them.
      try {
        eval(content);
        // eval loads the file to Handlebars.templates;
        return compile(file);
      } catch (e) {
        throw e;
      }
    }

    return Handlebars.compile(content);
  };

  const render = (name, context, callback) => {
    const { layouts, partials } = context;

    if (layouts) {
      layouts.map(partial);
    }

    if (partials) {
      partials.map(partial);
    }

    const compiled = compile(name);

    return callback(null, compiled(context));
  };

  return {
    render: render,
    compile: compile,
  };
}

module.exports = HBarsC;
