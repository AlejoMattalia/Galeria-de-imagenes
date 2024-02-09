const Publication = require("../models/Publication");
const fs = require("fs");

const save = (req, res) => {
  //params
  const params = req.body;
  const userId = req.user.id;
  
  if(!params.title){
    return res.status(400).json({
      status: "Error",
      message: "Debes ingresar un titulo"
    })
  }

  let image;
  if (req.file) {
    const i = req.file.originalname;
    const imageSplit = i.split(".");
    const extension = imageSplit[1];

    if (extension !== "jpeg" && extension !== "jpg" &&
      extension !== "gif" && extension !== "png") {

      fs.unlink(req.file.path, (error) => {
        return res.status(400).json({
          status: "Error",
          message: `No puedes subir imágenes con la extensión ${extension}`
        });
      });
    } else {
      image = req.file.filename;
    }
  } else {
    return res.status(400).json({
      status: "Error",
      message: "Debes subir una imagen"
    })
  }


  let newPublication = new Publication(params);
  newPublication.user = userId;
  newPublication.file = image

  newPublication.save().
    then((publication)=>{
      return res.status(200).json({
        status: "Success",
        message: "Subiste una publicación",
        publication
      })
    })
  
}


module.exports = {
  save
}