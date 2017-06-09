"use strict";

const mongoose= require('mongoose');
const conn= mongoose.connection;

//decimos a mongoose las promesas que usarmoa

mongoose.Promise = global.Promise;

conn.on("error" , err =>{
    console.log("Error de conexion");
    process.exit(1);
});

conn.once("open", () => {
    console.log("conectado a mongoDB");

});

mongoose.connect("nodemiguel:miguel123@mongodb://localhost/nodeapi");

//no necesito exportar nada porque mongo guarda la conexion

