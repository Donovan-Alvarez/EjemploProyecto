'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Ejemplo', {useNewUrlParser: true})

.then((err,res)=>{
    console.log('Conexión a la base de datos');
    app.listen(port, ()=>{
        console.log('El servidor de node y express');

    });

})

.catch(err => console.log(err));