var express = require('express');
var router = express.Router();
const Anuncio = require("../../models/Anuncio")

const basiAuth= require("../../lib/basicAuth");
router.use(basiAuth);

/* GET home page. */
router.get('/', function(req, res, next) {

    const tag= req.query.tag;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const rango = req.query.rango; //rango
    
    const limit = parseInt(req.query.limit); 
    
    const skip = parseInt(req.query.skip);
    const fields= req.query.fields; //campos
    const sort = req.query.sort; //
    
   
    const filter={}
    
    if (tag){
        filter.tag ={tags:{ $in:[tag]}};
    }
    
     if (venta){
        filter.venta =venta;
    }

    if (nombre)
    {
        filter.nombre= /^+nombre+\i"/;
    }
if(rango)
{
    console.log(rango)
    switch(rango)
{
    case "a": filter.precio= {precio:{$tg:10 , $lg:50}};  ;break;
    case "b": filter.precio={precio:{$gt:10}};  ;break;
    case "c": filter.precio={precio:{$gl:50}}  ;break;
    case "d": filter.precio={precio:50}  ;break;       
    
}
}

    Anuncio.list(filter,limit,skip,fields,sort, (err,agentes) =>
   {
        if(err)
       {
           next(err); // le dedimos a expres que devuelva error
           return;
       }

        res.json({ success : true , result:agentes});

  
});

});


router.post("/", (req,res,next) =>{
    console.log(req.body);

    // creamos un objeto tipo agente
const anuncio= new Anuncio(req.body);
//lo guardamos en la base de datos
anuncio.save((err ,anuncioguardado) =>{
    if(err)
   {
       next(err);
       return
   }
   res.json({success: true, result: anuncioguardado});
});


});





module.exports = router;