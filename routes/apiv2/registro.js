"use strict"

var express = require('express');
var router = express.Router();
const Usuario = require("../../models/Usuario")
const enigma= require("enigma-code")


const valorEncriptacion = 5;//puede ser cualquier numero 
let key = 'millave';//No debe tener espacios 


router.post('/', function(req, res, next) {
 
   console.log(req.body);

    // creamos un objeto tipo agente
    var usuario= new Usuario(req.body);
    console.log(usuario.clave);
  
    console.log("veamos sin hash" + usuario.clave);

   


    enigma.genHash(valorEncriptacion,key,usuario.clave,function(err,hash){
    if(err) return console.log(err);//Solo se ejecutara si existe un error 
    usuario.clave=hash;
    console.log(hash)//2dl3lkwkj13kj12k12kj321kj 
//esa funcion retorna por defecto en hash la contraseña encriptada 
});



    usuario.save((err ,usuarioguardado) =>{
    if(err)
   {
       next(err);
       return
   }
   res.json({success: true, result: usuarioguardado});
});


});

module.exports = router;



