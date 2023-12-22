//importaciones
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//rutas
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user/:token", userController.get_user_through_token);

//exportar router
module.exports = router;