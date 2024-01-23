//Importaciones
const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow");
const check = require("../middlewares/auth");

//Rutas
router.post("/follow_to_user", check.auth, followController.followToUser);
router.delete("/un_follow/:id", check.auth, followController.unFollow)
router.get("/follow_info/:id", check.auth, followController.followInfo);
router.get("/following/:id/:page?", followController.following);
router.get("/followsUserIds/:id", followController.followsUserIds);
router.get("/followers/:id/:page?", followController.followers); 

module.exports = router