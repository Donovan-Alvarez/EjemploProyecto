'use strict'

var Student = require('../models/student');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

function Prueba(req, res){
    res.status(200).send({
    message: 'Si esta conectado',
    teacher: req.Teacher
    });
}

function saveStudent(req,res){
    var student = new Student();
    var params = req.body;

    if(params.name && params.identity && params.career){
        student.name = params.name;
        student.surname = params.surname;
        student.career = params.career;
        student.identity = params.identity;
        student.imagen = null;
        student.teacher = req.teacher.sub;
    
    student.save((err,studentSave)=>{
        if(err){
            res.status(500).send({message: 'No se ha guardado'});
        }else{
            if(!studentSave){
                res.status(500).send({message: 'Error al guardar los datos'});
            }else{
                res.status(200).send({student: studentSave});
            }
        }
    });
}else{
    res.status(404).send({message: 'Debe introducir los campos requeridos'});
}
}

module.exports = {
    Prueba,
    saveStudent
};