var express = require('express');
var router = express.Router();
const Anuncio = require("../../models/Anuncio")

const basiAuth= require("../../lib/basicAuth");
router.use(basiAuth);

/* GET home page. */
router.get('/', function(req, res, next) {

    const tags= req.query.tags;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const minprecio=parseInt(req.query.minprecio);
    const precio=parseInt(req.query.precio);
    const masprecio=parseInt(req.query.masprecio);
    const rango = req.query.rango; //rango
    const limit = parseInt(req.query.limit); 
    const skip = parseInt(req.query.skip);
    const fields= req.query.fields; //campos
    const sort = req.query.sort; //
    
    const filter={}
    
    if (tags){filter.tags =tags};// busca tag en el array
    if (venta){ filter.venta =venta;} // busca true o false
    if (nombre){filter.nombre=  new RegExp (nombre, "i");}
    if(minprecio){filter.precio={"$gte": minprecio};}// busca precio minimo 
    if(precio){filter.precio=precio;} // precio exacto
    if(masprecio){ filter.precio={"$lte": masprecio};} // precio maximo
    if(rango) // establece 4 rangos de precios predefinidos
    {
        
        switch(rango)
            {
            case "a": filter.precio= {"$gte":10 ,"$lte":50};  ;break; // entre 10 y 50
            case "b": filter.precio={"$gte":10}  ;break; //mayor a 10
            case "c": filter.precio={"$lte":50}  ;break; // menor a 50
            case "d": filter.precio=50  ;break;       // precio 50
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
    // console.log(req.body);
    // creamos un objeto tipo agente
    const anuncio= new Anuncio(req.body);
    //lo guardamos en la base de datos
    anuncio.save((err ,anuncioguardado) =>{
        if(err){
             next(err);
            return
        }
   res.json({success: true, result: anuncioguardado});
    });
});


router.delete("/", (req,res,next) =>{
    console.log(req.body.id);

   
    const id= req.body.id;
    

    Anuncio.remove(({_id: id}),(err, borrado) => {
    if (err) {
            next(err)
            return
    }
    res.json({success: true, result: borrado});
});

});

router.put('/', (req, res) => {

const id= req.body.id;

Anuncio.update({ _id: id }, req.body, (err, anuncioModificado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: req.body.id});
    });
});




module.exports = router;