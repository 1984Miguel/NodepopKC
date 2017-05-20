

# Practica git Miguel Mingoarranz Pérez Keepcoding

### Iniciar servidor

* Inicio nornal: npm start
* Inicio debug: npm run deb
* Cargar bases de datos: npm run bases

### Inicio nuevas bases de datos

Este script genera unas nuevas bases de datos con los usuarios de los archivos anuncios.json y usuarios.json. las gases de ejecucion son las siguientes:

* borra las bases datos de mongose en las bases de datos node api
* Lee el fichero anuncios js y con el modelo de Anuncios carga los anuncios en la base de datos
* Efectua las mismas tareas con el archivo usuarios.js

### Modelos

Podemos encontrarlos en la carpeta ./models/Anuncio.js y ./models/Usuarios

* Ambos modelos tienen en cada campo el tipo de variable que voy a almacenar
* El modelo genera los indices de mongoose para que a la base de datos le sea mas faciles de encontrar los datos. Podemos diferenciar este parametro como
* En el modelo de usuarios. Campos como email y nombre de usuario solo pueden ser unicos añadiendo unique:true
* La busqueda de anuncios avanzada para la Version 2 tiene un metodo estatico que hablare mas adelante de el.

### Routes apiV1

Esta primera version realiza una busqueda de todos los articulos independientemente sea usuario registrado o no la ruta de acceso es:

**localhost:3000/apivi/anuncios**

