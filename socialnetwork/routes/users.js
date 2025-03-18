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
            res.status(201).json(nuevoUsuario); // Devuelve el nuevo usuario en JSON
        })
        .catch((error) => {
            // Devuelve el error en formato JSON
            res.status(400).json({ error: true, message: error.message });
        });
}); 
 
module.exports = router;