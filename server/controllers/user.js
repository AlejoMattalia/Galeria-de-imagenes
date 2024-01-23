//Importaciones
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path")

//Metodos
const register = (req, res) => {

  //Obtener los parametros de la peticion
  const params = req.body;

  //Validacion para ver si llegan los parametro
  if (!params.username || !params.email || !params.password) {
    return res.status(404).json({
      status: "Error",
      message: "Faltan parametros"
    })
  }

  //Verificar si el usuario existe
  User.find({
    $or: [
      { username: params.username },
      { email: params.email.toLowerCase() }
    ]
  }).exec()
    .then(async () => {

      //cifrar contraseña 
      const pwd = await bcrypt.hash(params.password, 10)
      params.password = pwd

      //crear user con todos los parametros
      let user_to_save = new User(params);


      //Guardar el usuario en la bbdd
      user_to_save.save()
        .then((user) => {

          //Crear token
          const token = jwt.createToken(user);

          res.status(200).json({
            status: "Success",
            message: "Te registraste correctamente",
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              description: user.description,
              photo: user.photo,
              role: user.role
            },
            token
          })

        })
        .catch((err) => {
          let messageError;
          let emailrepeat = err.keyValue.email;
          let nickrepeat = err.keyValue.username;


          if (emailrepeat) {
            messageError = "el email ya existe"
          } else if (nickrepeat) {
            messageError = "el nombre de usuario ya existe"
          }
          else {
            messageError = "Error no pudiste iniciar sesión"
          }

          return res.status(500).json({
            status: "Error",
            message: "No pudiste registrate",
            messageError
          })
        })


    })
    .catch((err) => {
      return res.status(500).json({
        status: "Error",
        message: "Error al registrar el usuario"
      })
    })
}


const login = (req, res) => {
  //Recoger parametros
  let params = req.body;

  if (!params.username_or_email || !params.password) {
    return res.status(400).json({
      message: "Error, no pudiste iniciar sesión, faltan datos por enviar",
      data: req.body
    })
  }

  //Buscar en la bbdd si el usuario exister
  User.findOne({ $or: [{ username: params.username_or_email }, { email: params.username_or_email }] }).exec()
    .then((user) => {

      if (user) {
        //Comprobar contraseña
        const pwd = bcrypt.compareSync(params.password, user.password);

        if (!pwd) {
          return res.status(404).json({
            status: "Error",
            message: "Contraseña incorrecta"
          })
        }
      } else {
        return res.status(404).json({
          status: "Error",
          message: "Email o nombre de usuario incorrecto"
        })
      }

      //token
      const token = jwt.createToken(user);

      return res.status(200).json({
        status: "Success",
        message: "Iniciaste sesión correctamente",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          description: user.description,
          photo: user.photo,
          role: user.role
        },
        token
      })

    })
    .catch((err) => {
      return res.status(500).json({
        status: "Error",
        message: "No pudiste inicar sesion",
        err
      })
    })
}


//Obtener usuario a traves del token
const get_user_through_token = (req, res) => {

  return res.status(200).json({
    status: "Success",
    message: "Usuario obtenido a traves del token",
    user: req.user
  })
}


//Perfil del usuario
const profile = (req, res) => {

  const id = req.params.id;

  User.findById(id)
    .select({password: 0})
    .exec()
    .then((userProfile) => {

      return res.status(200).json({
        status: "Success",
        message: "El perfil del usuario funciona",
        user: userProfile
      })

    })
    .catch(() => {

      return res.status(200).json({
        status: "Error",
        message: "El perfil no existe o hay un error",
      })

    })
}


const update = (req, res) => {

  const id = req.user.id;
  const userUpdate = req.body;
  const nameKey = Object.keys(userUpdate)
  let name = "";

  if (nameKey[0] === "description") {
    name = "la descripción"
  } else if (nameKey[0] === "photo") {
    name = "la foto"
  }

  //Verificar si el usuario existe
  User.findById(id).exec()
    .then((user) => {

      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: `Error, no pudiste editar ${name}`
        })
      }

      if (userUpdate[nameKey[0]] === "") {
        return res.status(404).json({
          status: "Error",
          message: `Error, no pudiste editar ${name}`
        })
      }

      User.findOneAndUpdate({ _id: id }, userUpdate, { new: true }).select({password: 0}).exec()
        .then((newUser) => {

          const token = jwt.createToken(newUser);

          return res.status(200).json({
            status: "Success",
            message: `Actualizaste correctamente ${name}`,
            user: newUser,
            token
          })
        })
        .catch(() => {
          return res.status(404).json({
            status: "Error",
            message: `Error, no pudiste editar ${name}`
          })
        })


    })
    .catch(() => {
      return res.status(404).json({
        status: "Error",
        message: `Error, no pudiste editar ${name}`
      })
    })
}



const upload_image = (req, res) => {
  let id = req.user.id;

  if (!req.file) {
    return res.status(500).json({
      status: "Error",
      message: `No pudiste actualizar la foto de perfil porque no es un file`,
    })
  }

  const image = req.file.originalname;
  const imageSplit = image.split(".");
  const extension = imageSplit[1];

  if (extension !== "jpeg" && extension !== "jpg" && extension !== "png") {

    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "Error",
        message: `No puedes subir imágenes con la extensión ${extension}`
      });
    });
  } else {

    User.findOneAndUpdate(
      { _id: id },
      { photo: req.file.filename },
      { new: true }
    )
      .select({ password: 0 })
      .exec()
      .then(userUpdate => {
        
        const token = jwt.createToken(userUpdate);

        if (!userUpdate) {
          return res.status(400).json({
            status: "Error",
            message: `No pudiste actualizar la foto de perfil`,
          });
        }

        if(req.user.photo !== "default.png"){
          fs.unlink(`images/profiles-images/${req.user.photo}`, (error) => {
            if (error) {
              console.error(error);
            }

            console.log("Imagen eliminada correctamente")
          });
        }

        return res.status(200).json({
          status: "Success",
          message: `Actualizaste la foto de perfil correctamente`,
          user: userUpdate,
          token,
        });
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
          status: "Error",
          message: `No pudiste actualizar la foto de perfil`,
        });
      });
  }
}


const show_image = (req, res) => {
  const file = req.params.file;
  const filePath = "./images/profiles-images/" + file;
  
  fs.stat(filePath, (error, exists) => {

    if (exists) {
      return res.sendFile(path.resolve(filePath))
    } else {
      return res.status(400).json({
        status: "Error",
        message: "No existe la imagen"
      })
    }

  })
}


module.exports = {
  register,
  login,
  get_user_through_token,
  profile,
  update,
  upload_image,
  show_image
}