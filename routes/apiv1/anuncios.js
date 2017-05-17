var express = require('express');
var router = express.Router();
const Anuncio = require("../../models/Anuncio")

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("entro ver anuncios")
  Anuncio.find({},(err,anuncio) =>{

    res.status(200).send(anuncio)
  });
});

module.exports = router;