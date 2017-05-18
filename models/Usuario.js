"use strict"

const mongoose = require("mongoose");


const usuarioSchema = mongoose.Schema({

nombre:String,
email: String,
clave: String

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