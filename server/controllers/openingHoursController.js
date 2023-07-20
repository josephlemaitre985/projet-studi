const OpeningHours = require('../models/openinghours');
const { Sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const openingHours = await OpeningHours.findAll({
      order: Sequelize.literal(
        `CASE
          WHEN day = 'Monday' THEN 1
          WHEN day = 'Tuesday' THEN 2
          WHEN day = 'Wednesday' THEN 3
          WHEN day = 'Thursday' THEN 4
          WHEN day = 'Friday' THEN 5
          WHEN day = 'Saturday' THEN 6
          WHEN day = 'Sunday' THEN 7
        END`
      ),
    });
    res.json({ success: true, openingHours }); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); 
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
    let openingHoursData = req.body;

    if (openingHoursData.isOpen === false) {
      openingHoursData = {
        ...openingHoursData,
        morningfrom: '00:00:00',
        morningto: '00:00:00',
        afternoonfrom: '00:00:00',
        afternoonto: '00:00:00',
      };
    }

    await OpeningHours.update(openingHoursData, { where: { day: req.params.day } });
    const updatedOpeningHours = await OpeningHours.findOne({ where: { day: req.params.day } });
    res.json(updatedOpeningHours);
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
