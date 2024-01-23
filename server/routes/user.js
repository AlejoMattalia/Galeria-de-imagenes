//importaciones
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const check = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/uploadImage");


//rutas
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user_through_token", check.auth, userController.get_user_through_token);
router.get("/profile/:id", userController.profile);
router.patch("/update", check.auth, userController.update);
router.post("/upload_image", [check.auth, uploadImage.single("file0")], userController.upload_image);
router.get("/show_image/:file", userController.show_image)

//exportar router
module.exports = router;