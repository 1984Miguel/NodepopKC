"use strict"

var express = require('express');
var router = express.Router();
const Usuario = require("../../models/Usuario")
const Enigma= require("enigma-code") // traigo modulo de enigmas
const EnigmaClaves=require("../../lib/enigma"); // obtengo clave y valor de encriptacion




router.get('/', function(req, res, next) {
    console.log("entro ver anuncios")
     Usuario.find({},(err,anuncio) =>{
    res.status(200).send(anuncio)
  });
});


router.post('/', function(req, res, next) {
 
   console.log(req.body);

    // creamos un objeto tipo agente
    var usuario= new Usuario(req.body);
    console.log(usuario.clave);
  
    console.log("veamos sin hash" + usuario.clave);

   


    Enigma.genHash(EnigmaClaves.valorEncriptacion,EnigmaClaves.key,usuario.clave,function(err,hash){
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

router.delete("/", (req,res,next) =>{
    console.log(req.body.id);

   
    const id= req.body.id;
    

    Usuario.remove(({_id: id}),(err, borrado) => {
    if (err) {
            next(err)
            return
    }
    res.json({success: true, result: borrado});
});

});

router.put('/', (req, res) => {

    const id= req.body.id;

    if(req.body.clave)
        {

             Enigma.genHash(EnigmaClaves.valorEncriptacion,EnigmaClaves.key,req.body.clave,function(err,hash){
               if(err) return console.log(err);//Solo se ejecutara si existe un error 
                 req.body.clave=hash;
                 console.log(hash)
                 //esa funcion retorna por defecto en hash la contraseña encriptada 
             });
        }


Usuario.update({ _id: id }, req.body, (err, anuncioModificado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: req.body.id});
    });
});


module.exports = router;



