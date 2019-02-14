'use strict'

var express = require('express');
var StudentController = require('../controllers/student');
var md_auth = require('../Middlewars/authenticated');
var api = express.Router();
var multiparty = require('connect-multiparty');


api.get('/prueba-student', StudentController.Prueba);
api.post('/student-save',md_auth.ensureAut,StudentController.saveStudent);

module.exports = api;

