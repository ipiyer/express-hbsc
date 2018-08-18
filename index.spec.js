const chai = require('chai');
const expect = chai.expect;
const path = require('path');

describe('compile', () => {
  describe('production', () => {
    const Handlebars = require('handlebars');
    let expressHbc;
    before(() => {
      process.env.NODE_ENV = 'production';
      expressHbc = require('./index')({
        Handlebars,
        templates: path.resolve('./templates'),
      });
    });
    it('should eval the file', () => {
      expressHbc.compile('./template/index_compiled.hbs');
      expect(Handlebars.templates).to.have.property(
        './template/index_compiled.hbs'
      );
    });
  });
  describe('non-prod', () => {
    const Handlebars = require('handlebars');
    let expressHbc;

    before(() => {
      process.env.NODE_ENV = 'development';
      expressHbc = require('./index')({
        Handlebars,
        templates: path.resolve('./templates'),
      });
    });
    it('should return a function', () => {
      const result = expressHbc.compile('./template/index.hbs');
      expect(typeof result).to.equal('function');
    });
  });
});

describe('render', () => {
  const Handlebars = require('handlebars');
  let expressHbc;
  before(() => {
    process.env.NODE_ENV = 'development';
    expressHbc = require('./index')({
      Handlebars,
      templates: path.resolve('./template'),
    });
  });
  it('render should match string', done => {
    const cb = (err, str) => {
      expect(str).to.not.equal(null);
      done();
    };

    const result = expressHbc.render(
      './template/index.hbs',
      { layouts: ['layout'] },
      cb
    );
  });
});
