const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

// Récupérer tous les employés
router.get('/', employeesController.getAll);

// Récupérer un employé par son ID
router.get('/:id', employeesController.getById);

// Créer un nouvel employé
router.post('/', employeesController.create);

// Mettre à jour les informations d'un employé
router.put('/:id', employeesController.update);

// Supprimer un employé
router.delete('/:id', employeesController.remove);

// Authentification de l'employé
router.post('/login', employeesController.login);

module.exports = router;
