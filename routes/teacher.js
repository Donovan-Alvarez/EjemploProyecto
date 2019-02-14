'use strict'

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../Middlewars/authenticated');

var api = express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir: "./Uploads/teachers"});

api.get('/prueba-controladorteacher',md_auth.ensureAut, TeacherController.pruebas);
api.post('/guardar-profesor', TeacherController.saveTeacher);
api.post('/login', TeacherController.loginteacher);
api.get('/list', TeacherController.listar);
api.put('/update-teacher/:id',md_auth.ensureAut,TeacherController.updateTeacher);
api.delete('/delete-teacher/:id', md_auth.ensureAut, TeacherController.deleteteacher);
api.post('/upload-imagen/:id', [md_auth.ensureAut, md_upload],TeacherController.uploadImage);
api.get('/get-imagen/:imagefile',TeacherController.getimagen);

module.exports = api;