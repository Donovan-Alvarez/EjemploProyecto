'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Cargar Rutas de teacher
var teacher_routes = require('./routes/teacher')
var student_routes = require('./routes/student')


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Uso de las rutas de teacher
app.use('/v2', teacher_routes)
app.use('/v1', student_routes)




module.exports = app;