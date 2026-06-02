const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Prediction = sequelize.define('Prediction', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { type: DataTypes.STRING(20), allowNull: false },
  height: { type: DataTypes.FLOAT, allowNull: false },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  bmi: { type: DataTypes.FLOAT, allowNull: false },
  calories: { type: DataTypes.INTEGER, allowNull: false },
  workout_duration: { type: DataTypes.INTEGER, allowNull: false },
  steps: { type: DataTypes.INTEGER, allowNull: false },
  sleep_hours: { type: DataTypes.FLOAT, allowNull: false },
  water_intake: { type: DataTypes.FLOAT, allowNull: false },
  activity_level: { type: DataTypes.STRING(20), allowNull: false },
  predicted_fat_loss: { type: DataTypes.FLOAT, allowNull: false },
  predicted_weight_loss: { type: DataTypes.FLOAT, allowNull: false },
  confidence_score: { type: DataTypes.FLOAT, allowNull: false }
}, {
  tableName: 'prediction_history'
});

User.hasMany(Prediction, { foreignKey: 'user_id' });
Prediction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Prediction;

