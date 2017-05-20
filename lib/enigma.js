"use strict"


const enigma = require('enigma-code');//llama el modulo  
const valorEncriptacion = 5;//puede ser cualquier numero 
let key = 'millave';//No debe tener espacios 
 

 /*
enigma.genHash(valorEncriptacion,key,'contraseña123',function(err,hash){
    if(err) return console.log(err);//Solo se ejecutara si existe un error 
    console.log(hash)//2dl3lkwkj13kj12k12kj321kj 
//esa funcion retorna por defecto en hash la contraseña encriptada 
});

*/

module.exports=Enigma;