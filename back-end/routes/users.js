//Importation express pour créer le routeur//
const express = require ('express');
//Création du routeur//
const router = express.Router();


const limiter = require ('../middleware/limiter');// middeleware limiter //
//Chargé le fichier controllers 
const userCtrl = require ('../controllers/usersCtlr');// Réécupérer le controleur pour "user"


/**ROUTES**/
//Création des routes  inscription et connexion //
router.post('/signup', limiter, userCtrl.signup);// Inscription//
router.post('/login', limiter, userCtrl.login); // Connexion//


//**EXPORT**/
module.exports = router;