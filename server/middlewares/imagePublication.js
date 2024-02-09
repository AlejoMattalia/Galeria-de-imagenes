//configuración para subir los archivos
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images/publication")
  },

  filename: (req, file, cb) => {
    cb(null, "publication-"+Date.now()+"-"+file.originalname)
  }
})

exports.imagePublication = multer({storage})