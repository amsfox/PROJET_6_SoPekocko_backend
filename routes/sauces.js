// contient la logique de nos routes pour les sauces.
const express = require('express');
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');



router.post("/", auth, multer, saucesCtrl.createProduct);
router.put('/:id', auth, multer, saucesCtrl.modifyProduct);
router.delete('/:id', auth, saucesCtrl.deleteProduct);
router.get('/:id', auth, saucesCtrl.getOneProduct);
router.get('/', auth, saucesCtrl.getAllProducts);
router.post('/:id/like', auth, saucesCtrl.likeDislike);


module.exports = router;