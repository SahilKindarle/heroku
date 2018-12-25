var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 User.findAll({}).then(users => res.send(users));
});


router.get('/search', function(req, res, next) {
 User.findAll({}).then(users => res.send(users));
});


module.exports = router;
