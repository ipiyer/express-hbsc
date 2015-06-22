var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    return res.render('hello/world.hbs', {
        title: 'Express'
    });
});

module.exports = router;