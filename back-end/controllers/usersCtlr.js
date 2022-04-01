const bcrypt = require('bcrypt'); // Récupérer bycrypt
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken'); // Récupérer de JWT
const xss = require('xss');
const db = require('../models/database');
const User = db.users
const Post = db.posts
const Comment = db.comments
// Importation pour utilisation des variables d'environnements.
const dotenv = require("dotenv");
// Importation pour utilisation des variables d'environnements.
require("dotenv").config(); //Cacher les mots de passe des utilisateurs.
const schemaPassValid = new passwordValidator();
//const maskData = require('maskdata');
schemaPassValid
  .is().min(8)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

//Requête signup (s'inscrire)//

exports.signup = (req, res, next) => {
  if (!schemaPassValid.validate(req.body.password)) {
    res.status(401).json({ alert:"Sécurité du mot de passe faible. Il doit contenir au moins 8 caractères, des majuscules et deux chiffres" })
  }
  //Mot de passe haché et email masqué
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        grade: req.body.grade,
        email: req.body.email,
        password: hash,
        sex: xss(req.body.sex),
        isAdmin : 0
        
      };
 
      // Création d'utlisateur
      
      User.create(user)
        .then(data =>  res.status(201).json({ message: ' Bravo compte crée  !' }))
        .catch(error =>
          res.status(400).json({
            message: "Mauvaise requête", error : error.message}));
    })
    .catch(error => res.status(500).json({ message :'impossible de créer votre compte', error : error.message }));
};

//Requête login (se connecter)

exports.login = (req, res) => {
  const loginEmail = req.body.email
  const loginPassword = req.body.password
  User.findOne({where:{email: loginEmail}}) 
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !', error : error.message  });
      }
      //mot de passe haché et email masqué
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = {
            email: req.body.email,
            password: hash,
          }});

      bcrypt.compare(loginPassword, user[0].password)
        .then(valid => {
          if (!valid) { // Si le mot de passe n'est pas le bon
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
        })

      res.status(200).json({
        message: "Vous êtes connecté !",
        userId: user[0].id,
        isAdminId: user[0].isAdminId,
        username: user[0].username,
        sex:user[0].sex,
        
        token: jwt.sign({
          userId: user[0].id,
           isAdminId: user[0].isAdminId,

        }, process.env.KEY_TOKEN, {expiresIn:'24h'})
       // users_id: user[0].id,
        
        
      });
    })
   .catch(error => res.status(500).json({ error : error.message}));

  


};