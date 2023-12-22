//importaciones
const jwt = require("jwt-simple");
const moment = require("moment");

//Funcion para generar el token
const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    photo: user.photo,
    description: user.description,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix()
  }

  return jwt.encode(payload, process.env.SECRET)
}

//Devolver el token
module.exports = {
  createToken
}