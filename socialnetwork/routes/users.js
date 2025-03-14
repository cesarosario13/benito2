const express = require('express'); 
const router = express.Router(); 
const UserController = require('../controllers/UserController'); 
 
 
router.get('/', function (req, res, next) { 
    UserController.getUsers() 
        .then((usuarios) => { 
            res.status(200).send(usuarios);  
        }) 
        .catch((error) => { 
            res.status(500).render("error", { message: error.message });  
        }); 
}); 
 
 
router.post('/', function (req, res, next) { 
    UserController.addUser(req)  
        .then((nuevoUsuario) => { 
            res.status(201).send(nuevoUsuario); 
        }) 
        .catch((error) => { 
            res.status(400).render("error", { message: error.message });  
        }); 
}); 
 
module.exports = router;