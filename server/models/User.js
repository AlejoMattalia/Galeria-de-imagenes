const {Schema, model} = require("mongoose");

const userShema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 16,
    trim: true,
    match: [
      /^[a-zA-Z0-9_]+$/,
      'Solo se permiten letras, números y guiones bajos',
    ],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\S+@\S+\.\S+$/,
      'El formato del correo electrónico no es válido',
    ],
  },

  password: {
    type: String,
    required: true,
    minlength:8,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'La contraseña debe contener al menos un número, una letra minúscula y una letra mayúscula',
    ],
  },

  photo: {
    type: String,
    default: "default.png"
  },

  description: {
    type: String,
    default: "No hay descripción",
    minlength:1
  },

  role: {
    type: String,
    default: "role_user"
  }
})


//Exportacion del Schema
module.exports = model("User", userShema, "users");