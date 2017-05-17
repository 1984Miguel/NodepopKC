var express = require('express');
var router = express.Router();
console.log("entro index")

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
