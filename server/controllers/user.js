//Importaciones
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
const jwtsimple = require("jwt-simple")
const moment = require("moment")

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
    .select({_id: 0, password: 0, role: 0})
    .exec()
    .then((userProfile)=>{

        return res.status(200).json({
          status: "Success",
          message: "El perfil del usuario funciona",
          user: userProfile
        })
      
    })
    .catch(()=>{

      return res.status(200).json({
        status: "Error",
        message: "El perfil no existe o hay un error",
      })

    })


}



module.exports = {
  register,
  login,
  get_user_through_token,
  profile
}