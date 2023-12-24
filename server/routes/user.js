//importaciones
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const check = require("../middlewares/auth");

//rutas
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user_through_token", check.auth, userController.get_user_through_token);
router.get("/profile/:id", check.auth, userController.profile)

//exportar router
module.exports = router;