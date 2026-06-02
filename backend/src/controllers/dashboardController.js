const Prediction = require('../models/Prediction');

async function getStats(req, res, next) {
  try {
    const userId = Number(req.query.userId);
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const rows = await Prediction.findAll({ where: { user_id: userId } });
    const total = rows.length;
    const sum = (key) => rows.reduce((acc, row) => acc + Number(row[key] || 0), 0);
    res.json({
      total_predictions: total,
      average_fat_loss: total ? Number((sum('predicted_fat_loss') / total).toFixed(2)) : 0,
      average_weight_loss: total ? Number((sum('predicted_weight_loss') / total).toFixed(2)) : 0
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getStats };

