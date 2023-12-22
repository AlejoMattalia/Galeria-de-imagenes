//Importar dependencias
const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");

//Utilizar variables de entornos
dotenv.config();

//App arrancada
console.log("Galeria de imagen arrancada");


//Conección a la base de datos
connection();


//Crear servidor de node
const app = express();
const port = 4000;


//configurar cors
app.use(cors());


//Covertir los datos que llegan desde el body a json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Rutas
const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);


//rutas de pruebas
app.get("/ruta-prueba", (req, res)=>{
  res.status(200).json({
    message: "La ruta funciona"
  })
});


//Poner el servidor a escuchar peticiones http
app.listen(port, ()=> console.log("Servidor de node corriendo en el puerto: "+port))
