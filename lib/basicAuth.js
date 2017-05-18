
"use strict"

const BasicAuth= require("basic-auth");

module.exports= (req,res,next) =>
{
       const user= BasicAuth(req);
       console.log(user);

       //buscar base de datos usuario 
// comprobar la contraseña

       if(!user ||user.name !== "admin" || user.pass !=="12345")
     {
        res.set("WWW-Authenticate", "Basic realm=Autorization Requied");
        res.send(401);
        return;
     }
   next();
};
