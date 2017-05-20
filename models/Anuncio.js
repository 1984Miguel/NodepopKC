 "use strict"

const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({

nombre: {type:String, index: true, required: true},
venta: {type:Boolean,index:true, required: true},
precio: {type:Number,index:true, required: true},
foto: {type:String,index:true, required: true},
tags: {type:[String]}

});

anuncioSchema.statics.list= function (filter, limit,skip, fields, sort, callback){

   const query= Anuncio.find(filter) ;
   //query.rango(rango);
   query.limit(limit);
   query.skip(skip);
   query.select(fields);
   query.sort(sort);

   query.exec(callback);
};

var Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports= Anuncio; 
/*  Crea un anuncio esta desabilitado para no crear usuarios cada vez que se realiza 
    una conexion nueva.


var PrimerAnuncio = new Anuncio({

"nombre": "Bicicleta",
 "venta": true,
"precio": 230.15,
"foto": "bici.jpg",
"tags": [ "lifestyle", "motor"]

});



PrimerAnuncio.save(function(err, doc){
    if(err)
    {
        console.log(err);
    }
    console.log("anuncio guardado");
});
*/
