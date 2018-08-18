var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.render('hello/world', {
    title: 'Express',
    layouts: ['layouts/outer'],
    partials: ['hello/_partial/include'],
  });
});

module.exports = router;
