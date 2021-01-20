// L'application fait appel aux differentes fonction de l'API comme l'acces aux routes
const express = require("express"); // on importe l'application express
const bodyParser = require("body-parser"); //transformer le corps de la requte au format json
const mongoose = require('mongoose'); // permet de communiquer avec la bse de donnée mongo DB
const env = require("dotenv").config()

const path = require('path');



const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const app = express();

let pwd = process.env.PWRD;
let user = process.env.USER;

  mongoose.connect(`mongodb+srv://${user}:${pwd}@cluster0.z6hwp.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// corriger l'erreur CORS qui bloque par defaut les apples http éffectués entre des serveurs differents (ex dans notre cas localhost:3000 et localhost:4000)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); // utiliser pour le middleware multer pour les images

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);


module.exports = app; // on exporte l'application pour qu'on puisse y accéder depuis les autres fichiers de notre projet notament notre serveur Node



