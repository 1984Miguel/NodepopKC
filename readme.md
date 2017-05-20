

# Practica git Miguel Mingoarranz Pérez Keepcoding

Guia rapida de usuario de mi aplicacion en el codigo se pueden encontrar explicaciones detalladas a nivel tecnico de cada cosa

### Iniciar servidor

* Inicio nornal: npm start
* Inicio debug: npm run deb
* Cargar bases de datos: npm run bases

### Inicio nuevas bases de datos

Este script genera unas nuevas bases de datos con los usuarios de los archivos anuncios.json y usuarios.json. las gases de ejecucion son las siguientes:

* Las promesas necesarias pueden encontrarse en el fichero ./scripts/install_dbs.js
* borra las bases datos de mongose en las bases de datos node api
* Lee el fichero anuncios js y con el modelo de Anuncios carga los anuncios en la base de datos
* Efectua las mismas tareas con el archivo usuarios.js
* En el registro de usuarios se ademas procedo a la encriptacion que hablare en la version 2

### Modelos

Podemos encontrarlos en la carpeta ./models/Anuncio.js y ./models/Usuarios

* Ambos modelos tienen en cada campo el tipo de variable que voy a almacenar
* El modelo genera los indices de mongoose para que a la base de datos le sea mas faciles de encontrar los datos. Podemos diferenciar este parametro como
* En el modelo de usuarios. Campos como email y nombre de usuario solo pueden ser unicos añadiendo unique:true
* La busqueda de anuncios avanzada para la Version 2 tiene un metodo estatico que hablare mas adelante de el.


#V:1

### Routes apiV1

Esta primera version realiza una busqueda de todos los articulos en una peticion tipo post independientemente sea usuario registrado o no la ruta de acceso es:

**localhost:3000/apivi/anuncios**

#V2

## Carpeta lib

### BasicAuth.js

Esta libreria se encargara de validar los usuarios para acceder a la aplicacion en la version 2. Comprobara de la base de datos las creenciales. Se apolla en la libreria enigma para comprobar y verificar que ambis hash coinciden. 

He optado por encriptar la clave que introduce el usuario y comprobar que ambas son iguales

Use la libreria usada en clase por problemas de tiempo.

### connectmongoose.js (tambien usada version 1)

Esta libreria se encarga de conectar la base de datos de mongo con mi api node. 

###Enigma.js

**IMPORTANTE SOLO SE PUEDEN REGISTRAR CONTRASEÑAS CON AL MENOS 10 CARACTERES**

Esta libreria genera el hash de la contraseña. Prodemos encontrar la informacion de uso en :  https://www.npmjs.com/package/enigma-code


Uso esta libreria porque me permite generar mi propia llave y valor de encriptacion. Actualmente este archivo se encuentra en el repositorio de git para que cualquiera pueda ejecutar mi aplicacion de forma local. En un proyecto real este archivo se eliminaria para que nadie pueda ver los valores de encriptacion y evitar robos de datos

###Modelos ampliacion

Esta version realiza las mismas operaciones que en version 1 Añadiendo:

*Anuncios.js Intoduzco un metodo estatico que realizare busquedas personalizas con mongoose. Todas las busquedas posibles seran explicadas en el apartado routes

###Routes

####Anuncios.js

**Para acceder a es necesario ser un usuario registrado en la base de datos**

El sistema de versionado para la practica se ha realizado con este sistema para facilitar el primer proyecto con esta tecnologia y su revision. En el futuro este tipo de versionado se hara con git y el uso de ramas.El ultimo comit de entrega llevara la etiqueta version 2

localhost:3000/apiv2/anuncios.js

* get sin querys: ESta peticion devolvera todos los registros que hay en la base de datos
* get con querys: Podemos poner los sigientes parametros

    * tags :     buscara en la base de datos aquillos que contenga dentro del campo tags uno de los              sigientes parametros [motor,mobile, work,movile] Estos parametros vienen definidos              por el modelo y no se solo se puede poner articulos con estos 4 tags
    * venta :    buscara articulos en funcion de venta o se busca hay que añadir query tipo false o              true
    * nombre:    Busca nombre de un articulo. Con una expresion regular solo hay que añadir el                   principio del nombre y el sistema busca coincidencias que empiecen por esa cadena
    * minprecio: Busca articulos con el precio minimo . Introducir numero
    * precio     Busca articulos con el precio exacto. Introducir numero
    * maxprecio  Busca articulos con el precio maximo . Introducir numero
    * rango:     Existen 4 rangos definidos:
        * rango=a Articulos entre 10 y 50 euros
        * rango=b mas de 10 euros
        * rango=c menos de 50 euros
        * rango=d igual a 50 euros
    * limit 
    * skip 
    * fields    Numero de campos devueltos
    * sort      Ordena por el campo seleccionado ascendente 1 descendente -1

* post Esta opcion nos permite crear nuevos anuncios . En postman debemos añadir:

    nombre : Nombre del articulo string se puede repetir
    venta: false (se busca) o true (venta)
    precio : precio en numero
    foto   : nombre archivo ( en futuas aplicaciones se guardara todo en la misma carpeta y el programa se encargara de escribir la ruta delante del nombre EJ "../fotos/"+ nombreArchivo)
    tags    : etiquetas del articulo en formato array 

#### registro.js

 * post :permite registrarse a los usuarios bajo las siguientes condiciones:
    * nombre: debe ser unico debe contener letras o numeros
    * email: debe ser unico. tiene una expresion regular que verifica el formato
    * clave  se da en tipo string y el programa crea un hast gracias a enigma y lo guarda en la       base de datos     

