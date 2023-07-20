const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAll = async (req, res) => {
  try {
    const employees = await User.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des employés' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await User.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }
    res.json(employee);
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'employé avec l'ID ${id}`, error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'employé' });
  }
};

const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await User.create({ firstName, lastName, email, password: hashedPassword });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Erreur lors de la création de l\'employé', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'employé' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    const employee = await User.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : employee.password;
    await employee.update({ firstName, lastName, email, password: hashedPassword });
    res.json(employee);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'employé avec l'ID ${id}`, error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'employé' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await User.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }
    await employee.destroy();
    res.json({ message: 'Employé supprimé avec succès' });
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'employé avec l'ID ${id}`, error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'employé' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await User.findOne({ where: { email } });
    if (!employee) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }


    res.json({ message: 'Connexion réussie', employee });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'employé', error);
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'employé' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  login,
};
