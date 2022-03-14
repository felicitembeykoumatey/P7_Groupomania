//Exiger les dépendances et chargé les fichiers
//Variables/ constances
const express = require("express"); // chargé librairie express
const router = express.Router(); // router 
const auth = require('../middleware/auth'); // authentification
const multer = require("../middleware/multer-config"); // chargé package multer  pour la  gestion des fichiers ( images des différents formats)
const categoriesCtrollers = require('../controllers/postsCtlr');//Chargé le fichier controllers 

// Création des routes  GET POST PUT DELETE

//Création d'un catégorie des actualités (text, image, file.txt)
router.post('/categories', auth, multer, categoriesCtrollers.create);
//router.get('/', auth, categoriesCtrollers.findAllPost);
//router.get('/:id', auth, categoriesCtrollers.findAllPostFromOneUser);
router.put('/:id', auth, multer, categoriesCtrollers.modifyPost);
//router.delete('/:id', auth,  categoriesCtrollers.deletePost);
module.exports = router;