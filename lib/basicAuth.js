
"use strict"

const BasicAuth= require("basic-auth");
const Usuario= require("../models/Usuario")
const mongoose= require("mongoose")
const enigma = require('enigma-code');//llama el modulo 
const EnigmaClaves=require("../lib/enigma"); // obtengo clave y valor de encriptacion


module.exports= (req,res,next) =>
{
       var user= BasicAuth(req);
       //console.log(user.name);
       var usuarioAux= new Usuario({nombre:user.name, clave: user.pass})
       

       //buscar base de datos usuario 
       Usuario.find({nombre: usuarioAux.nombre},(err,userbus) =>{
         
      //   console.log(userbus[0].clave)
      //   console.log(usuarioAux.clave);

         enigma.genHash(EnigmaClaves.valorEncriptacion,EnigmaClaves.key,usuarioAux.clave,function(err,hash){
    if(err) return console.log(err);//Solo se ejecutara si existe un error 
    // console.log("este seria el hast del usuario cargado" +hash)
    usuarioAux.clave= hash
//esa funcion retorna por defecto en hash la contraseña encriptada 
});
         
         
         //comprobar usuario
        if(!user || usuarioAux.nombre!=userbus[0].nombre|| usuarioAux.clave!=userbus[0].clave)
        {
        res.set("WWW-Authenticate", "Basic realm=Autorization Requied");
        res.send(401);
        return;
     }
     else
     {
      //  console.log("usuario registrado:+" + userbus);
     }

  });


   next();

   
};
