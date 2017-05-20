"use strict"

const fs= require ("fs")
const mongoose= require("mongoose");
const Anuncio = require("../models/anuncio")
const Usuario = require("../models/Usuario")

const enigma= require("enigma-code")
const valorEncriptacion = 5;//puede ser cualquier numero 
let key = 'millave';//No debe tener espacios 

console.log(" borro y creo bases de datos");

function borrar()
{
 return new Promise((resolve, reject)=>{
    var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect("mongodb://localhost/nodeapi", function(err, db) {
        
        db.dropDatabase(function(err, result) {});
        });
     resolve();
    
 });


}


function leerarchivoanun(loc)
{
 return new Promise((resolve, reject)=>{
    mongoose.connect("mongodb://localhost/nodeapi");
     fs.readFile("./scripts/"+loc+".json","utf-8",(err,data) =>{
            //console.log(JSON.parse(data)[loc][0]['nombre'])
            const aux= JSON.parse(data)[loc];
            
                 for(let i=0;i<aux.length;i++)
                 {    
                     const anuncio = new Anuncio(aux[i]);
                   
                    anuncio.save(function (err, anunciocreado) {
                         if(err)
                         {
                              console.log(err);
                          }
                    
                         console.log('anuncio' + anunciocreado)
            
                 
                     });
                      
               }
         })   
         resolve()
})
}

function leerarchivouser(loc)
{
 return new Promise((resolve, reject)=>{
    mongoose.connect("mongodb://localhost/nodeapi");
     fs.readFile("./scripts/"+loc+".json","utf-8",(err,data) =>{
            //console.log(JSON.parse(data)[loc][0]['nombre'])
            const aux= JSON.parse(data)[loc];
            
                 for(let i=0;i<aux.length;i++)
                 {    
                     const usuario = new Usuario(aux[i]);

                      enigma.genHash(valorEncriptacion,key,usuario.clave,function(err,hash){
                            if(err) return console.log(err);//Solo se ejecutara si existe un error 
                    usuario.clave=hash;
                    console.log(hash)//2dl3lkwkj13kj12k12kj321kj 
                    //esa funcion retorna por defecto en hash la contraseña encriptada 
});
                    
                    usuario.save(function (err, usuariocreado) {
                         if(err)
                         {
                              console.log(err);
                          }
                    
                         console.log('usuario' + usuariocreado)
            
                 
                     });
                      
               }
         })   
         resolve()
})
}




 borrar().then(() =>{
console.log("base de datos borrada")
 });

leerarchivoanun("anuncios").then(() =>{
console.log("Anuncios guardados")
 });

leerarchivouser("usuarios").then(() =>{
console.log("Usuarios guardados")
 });

 
 