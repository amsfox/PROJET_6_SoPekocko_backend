// élément de logique métier de la route POST vers notre contrôleur (users)  //
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/User")

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;
const PASSWORD_REGEX  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const REGEX_INJECT = /[\=\'\'\{\}]/; // ne doit pas contenir les caractères suivants : =, ", ", {, }

exports.signup = (req, res, next) => {
  // variables
  var email = req.body.email;
  var password = req.body.password;
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'email is not valid' });
  };
  if (REGEX_INJECT.test(password)) {
    return res.status(400).json({ 'error': 'password invalid must no include "=}{' });
  };
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'password invalid (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)' });
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
