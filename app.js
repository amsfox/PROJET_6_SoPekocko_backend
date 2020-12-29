const express = require("express");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        userId: 'Mon premier objet',
        name: 'Mon premier objet',
        manufacturer: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        mainPepper: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        heat: 10,
        likes: 15,
        dislikes: 20,
        usersLiked: 'Les infos de mon premier objet',
        usersDisliked: 'Les infos de mon premier objet',
      },
      {
        _id: 'oeihfzeoi',
        userId: 'Mon premier objet',
        name: 'Mon premier objet',
        manufacturer: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        mainPepper: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        heat: 10,
        likes: 15,
        dislikes: 20,
        usersLiked: 'Les infos de mon premier objet',
        usersDisliked: 'Les infos de mon premier objet',
      },
    ];
    res.status(200).json(stuff);
  });


module.exports = app;