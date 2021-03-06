

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users')
var app = express();

//lamo a la base de datos
require("./lib/connectmongoose.js")


//llamo a los modelos
require("./models/Anuncio");
require("./models/Usuario");

//console.log("entro a rutas")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

  app.use((req,res,next)=>{

    console.log("soy un midelware y estoy evaluando lapeticion, ", req.originalUrl);
    next();
  });


//llamo a las diferentes rutas de mi proyecto
app.use('/', index);
app.use('/users', users);
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv2/anuncios', require('./routes/apiv2/anuncios'));

app.use('/apiv2/registro', require('./routes/apiv2/registro'));

// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  next(err);
});
*/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function isApi(req)
{
  return req.originalUrl.indexOf('/api') === 0;

}

module.exports = app;
