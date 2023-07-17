const OpeningHours = require('../models/openinghours');

exports.getAll = async (req, res) => {
    try {
        const openingHours = await OpeningHours.findAll();
        res.json(openingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByDay = async (req, res) => {
    try {
        const openingHours = await OpeningHours.findOne({ where: { day: req.params.day } });
        res.json(openingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const openingHours = await OpeningHours.create(req.body);
        res.json(openingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const openingHours = await OpeningHours.update(req.body, { where: { day: req.params.day } });
        res.json(openingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const openingHours = await OpeningHours.destroy({ where: { day: req.params.day } });
        res.json(openingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
