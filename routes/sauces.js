// contient la logique de nos routes pour les sauces (fonctions qui s'appliquent aux routes)
const express = require('express');
const router = express.Router(); // permet d'appeler la logique de route

const saucesCtrl = require("../controllers/sauces"); // logique metier à appliquer aux routes du CRUD
const auth = require("../middleware/auth"); // configuration d'authentification jsonwebtoken
const multer = require('../middleware/multer-config'); // traitement des fichiers image



router.post("/", auth, multer, saucesCtrl.createProduct);
router.put('/:id', auth, multer, saucesCtrl.modifyProduct);
router.delete('/:id', auth, saucesCtrl.deleteProduct);
router.get('/:id', auth, saucesCtrl.getOneProduct);
router.get('/', auth, saucesCtrl.getAllProducts);
router.post('/:id/like', auth, saucesCtrl.likeDislike);


module.exports = router;