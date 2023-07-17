const express = require('express');
const router = express.Router();
const Car = require('../models/car');

router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    console.log(cars)
    res.json(cars);
  } catch (error) {
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: 'Annonce de voiture introuvable.' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération de l\'annonce de voiture.' });
  }
});


router.post('/', async (req, res) => {
  try {
    const car = await Car.create(req.body) 
    console.log(req.body)
    
    res.status(201).json({ message: 'Annonce de voiture ajoutée avec succès.' });
  } catch (error) {
    res.send(error)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let updatedCar = await Car.findByPk(id);
    if (!updatedCar) {
      return res.status(404).json({ message: 'Annonce de voiture introuvable.' });
    }
    updatedCar = Object.assign(updatedCar, req.body);
    await updatedCar.save();

    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'annonce de voiture.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Annonce de voiture introuvable.' });
    }
    await car.destroy();
    res.json({ message: 'Annonce de voiture supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'annonce de voiture.' });
  }
});

module.exports = router;
