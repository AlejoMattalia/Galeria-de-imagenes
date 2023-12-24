//Importaciones
const jwt = require("jwt-simple");
const moment = require("moment");


//Función de autenticación
exports.auth = (req, res, next) => {

  //Comprobar si llega la cabecera de auth
  if(!req.headers.authorization){
    return res.status(404).json({
      status: "Error",
      message: "Falta la cabecera de autenticación"
    })
  }

  //Limpiar token
  let token = req.headers.authorization.replace(/['"]+/g, '');
  
  //Decodificar el token
  try{
    let payload = jwt.decode(token, process.env.SECRET);

    if(payload.exp <= moment().unix()){
      res.status(404).json({
        status: "Error",
        message: "Token expirado",
      })
    }
  
    req.user = payload;
    
  }catch(err){
    return res.status(404).json({
      status: "Error",
      message: "Token invalido o expirado, inicia sesión nuevamente",
    })
  }
  
  next();
}