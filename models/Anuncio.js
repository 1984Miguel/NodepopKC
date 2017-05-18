 "use strict"

const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({

nombre: String,
venta: Boolean,
precio: Number,
foto: String,
tags: [String]

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
/*
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
