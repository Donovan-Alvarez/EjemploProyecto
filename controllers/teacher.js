'use strict'

var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');
var fs = require('fs');
var path = require('path');

function saveTeacher(req, res){
    var teacher = new Teacher();
    var params = req.body;

    if (params.password && params.surname && params.surname && params.email){
        teacher.name = params.name;
        teacher.surname = params.surname;
        teacher.email = params.email;
        teacher.role = 'ROLE_TEACHER';
        teacher.imagen = null;

          Teacher.findOne({email: teacher.email.toLowerCase()}, (err, issetTeacher) =>{

            if(err){
              res.status(500).send({message: 'Error, el usuario ya no existe'});

            }else{
              if(!issetTeacher){
              //  res.status(200).send({message: 'Aqui va el cirado y comparacion de contrasena'});
              bcrypt.hash(params.password, null, null, function (err, hash){
                  teacher.password = hash;
        
                  teacher.save((err, teacherStored) => {
                    if(err){
                      res.status(500).send({message: 'error al guardar'});
                    }else{
                      if(!teacherStored){
                        res.status(404).send({message: 'no se pudo registrar el usuario'});
                      }else{
                        res.status(200).send({teacher: teacherStored});
                      }
                    }
                  });
              });
              }else{
                  res.status(200).send({message: 'El usuario no puede registrarse'});
                  }
              }
            });
            }else{
              res.status(200).send({message: 'intoduce los datos correctamente'});
              }
            }

//LOGIN DE USUARIO

function loginteacher(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    Teacher.findOne({email: email.toLowerCase()},(err, teacher)=>{
      if(err){
        res.status(500).send({message: 'Error al intentar iniciar sesión'});
      }else{
        if(teacher){
          bcrypt.compare(password, teacher.password, (err, check)=>{
            if(check){
              if(params.gettoken){
                res.status(200).send({
                  token: jwt.createToken(teacher)
                });
              }else{
                res.status(200).send(teacher);
              }
              res.status(200).send(Teacher);
            }else{
              res.status(404).send({message: 'El usuario no ha podido logearse correctamente'});
            }
          });
        }else{
          res.status(404).send({message: 'No se ha podido encontrar el usuario'});
        }
      }
    });


}


function pruebas(req, res){
    res.status(200).send({ message: 'Prueba de controlador',
     teacher: req.teacher});
}
function listar(req, res){
  Teacher.find({}, (err,teacher)=>{
    if(err){
      res.status(500).send({message: 'no se ha podido listar los usuarios'});
    }else{
      res.status(200).send({teacher});
    }
  });


}

function updateTeacher(req,res){
  var teacherid = req.params.id;
  var update = req.body;

  if(teacherid != req.teacher.sub){
    res.status(500).send({message: 'No tiene permiso para actualizar el profesor'});
  }
  Teacher.findByIdAndUpdate(teacherid, update,{new: true}, (err, teacherUpdate)=>{
    if(err){
      res.status(500).send({message: 'Error al actualizar el teacher'});
    }else{
      if(!teacherUpdate){
        res.status(404).send({message: 'No se ha podido actualizar el teacher'});
      }else{
        res.status(200).send({teacher: teacherUpdate});
      }
    }
  });
}

function deleteteacher (req, res){
  var id = req.params.id;
  Teacher.findByIdAndDelete({_id: id}, (err, teacher)=>{
      if(err){
        send.status(500).send({message: 'No se encuentra'});
      }
      if(!id){
        res.status(404).send({message: 'No se pudo eliminar'});
      }else{
        res.status(200).send({message: 'Usuario Eliminado'});
      }
  });
}

function uploadImage(req,res){
  var teacherId = req.params.id;
  var files_name = 'Archivo no subido';

  if(req.files){
    var file_path = req.files.imagen.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_explit = file_name.split('\.')
    var file_ext = ext_explit[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpge' || file_ext == 'gif'){
      if(teacherId != req.teacher.sub){
        res.status(500).send({
          message: 'No tiene permiso para modificar el usuario'
        });
      }
      Teacher.findByIdAndUpdate(teacherId, {imagen: file_name}, {new: true}, (err, teacherUpdate)=>{
        if(err){
          send.status(500).send({message: 'Error al actualizar el profesor'});
        }else{
          if(!teacherUpdate){
            res.status(404).send({message: 'NO se ha podido actualizar el usuario'});
          }else{
            res.status(200).send({teacher: teacherUpdate, imagen: file_name});
          }
        }
      });
    }else{
      res.status(200).send({message: 'Extensión no admitida'});
      fs.unlink(file_path, (err)=>{
        if(err){
        res.status(200).send({message: 'Extensión no es admitida y archivo no borrado'});
      }else{
        res.status(202).send({message: 'Extensión no admitida ...'});
      }
      });
    }

    //res.status(200).send({file_path,file_split,file_name});
  }else{
    res.status(404).send({message: 'No se ha subido archivos'});
  }
}

function getimagen(req, res){
  var imagefile = req.params.imagefile;
  var path_file = './Uploads/teachers'+imagefile;
  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'El archivo no existe'});
    }
  })

}

module.exports = {
    pruebas,
    saveTeacher,
    loginteacher,
    listar,
    updateTeacher,
    deleteteacher,
    uploadImage,
    getimagen
};
