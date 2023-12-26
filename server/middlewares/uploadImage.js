//configuración para subir los archivos
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images/profiles-images")
  },

  filename: (req, file, cb) => {
    cb(null, "profiles-images-"+Date.now()+"-"+file.originalname)
  }
})

exports.uploadImage = multer({storage})