const { Op } = require('sequelize');
const Prediction = require('../models/Prediction');

async function getHistory(req, res, next) {
  try {
    const userId = Number(req.query.userId);
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const search = req.query.search || '';
    const where = { user_id: userId };
    if (search) where.activity_level = { [Op.like]: `%${search}%` };
    const rows = await Prediction.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function deleteHistory(req, res, next) {
  try {
    const deleted = await Prediction.destroy({
      where: { id: req.params.id, user_id: req.body.userId || req.query.userId }
    });
    if (!deleted) return res.status(404).json({ message: 'Prediction not found' });
    res.json({ message: 'Prediction deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getHistory, deleteHistory };

