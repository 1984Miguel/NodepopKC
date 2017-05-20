"use strict"

const mongoose = require("mongoose");

const enigma = require('enigma-code');//llama el modulo  
const valorEncriptacion = 5;//puede ser cualquier numero 
let key = 'millave';//No debe tener espacios 


const usuarioSchema = mongoose.Schema({

nombre:{type:String, index: true, unique:true},
email: {type:String, index: true, unique:true},
clave: {type:String, index: true},

});

var Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports= Usuario; 
/*
var PrimerUsuario =  new Usuario({
    nombre : 'eloy',
    email: 'eloy@pepito.com',
    clave: "12345"
});

PrimerUsuario.save((err,data)=>{
    if (err)
    {
        console.log("error mal guardado");
    }
        console.log("guardado usuario");

});
*/