// contient la logique de nos routes pour les usrs (fonctions qui s'appliquent aux routes)
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user")

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);


module.exports = router;