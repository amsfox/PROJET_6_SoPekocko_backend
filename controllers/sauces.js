// élément de logique métier de nos routes  vers notre contrôleur
const Product = require("../models/Product") // recuperation sauces model
const fs = require('fs'); // file systeme

exports.createProduct = (req, res, next) => { // route POST
    const productObject = JSON.parse(req.body.sauce);
    delete productObject._id;
    const product = new Product({
      ...productObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      usersLiked: [],
      usersDisliked: [],
      likes: 0,
      dislikes: 0
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};


exports.modifyProduct = (req, res, next) => { // route PUT
  const productObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Product.updateOne({ _id: req.params.id }, { ...productObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteProduct = (req, res, next) => { // route delete
  Product.findOne({ _id: req.params.id })
    .then(product => {
      const filename = product.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
  });
})
    .catch(error => res.status(500).json({ error }));
};

exports.getOneProduct = (req, res, next) => { // route read une sauce
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllProducts = (req, res, next) => { // route read toutes les sauces
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
};

exports.likeDislike = (req, res, next) => { // route post pour les like et dislike
  // les variables
  const like = req.body.like
  

  //les conditions
  Product.findOne({ _id: req.params.id })
    .then(product => {
      let message = null;
      if (like === 1) { //like
        product.likes++;
        product.usersLiked.push(req.body.userId);
        message = "like ajouté";
      }
    
      else if (like === -1) { //dislike
        product.dislikes++;
        product.usersDisliked.push(req.body.userId);
        message = "dislike ajouté";
    
      }
    
      if (like === 0) {
        if (product.usersLiked.find(userId => userId == req.body.userId) != undefined) { // si like (enlever le like)
          product.likes--;
          const filterUsersLiked = product.usersLiked.filter(elt => elt != req.body.userId);
          console.log(filterUsersLiked);
          product.usersLiked = filterUsersLiked;
          console.log(product.usersLiked);
          message = "like rétiré";        
          
        } else { // si dislike (enlever l edislike)
          product.dislikes--;
          const filterUsersDisliked = product.usersLiked.filter(elt => elt != req.body.userId);
          product.usersDisliked = filterUsersDisliked;
          message = "dislike rétiré";
        }

    
      }

      Product.updateOne({ _id: product._id }, {
        likes: product.likes, 
        dislikes: product.dislikes,
        usersLiked: product.usersLiked,
        usersDisliked: product.usersDisliked
      })
          .then(() => res.status(200).json({ message: message}))
          .catch(error => {
            console.log(error);
            res.status(400).json({ error })});

    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ error })});
  

}