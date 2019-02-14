'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var StudentSchema = Schema({
    name: String,
    surname: String,
    identity: String,
    career: String,
    imagen: String,
    teacher: {type: ObjectId, ref: 'Teacher'}
});

module.exports = mongoose.model('Student', StudentSchema);