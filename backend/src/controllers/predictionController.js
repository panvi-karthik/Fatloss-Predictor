const Prediction = require('../models/Prediction');
const { getPrediction } = require('../services/mlService');

async function createPrediction(req, res, next) {
  try {
    const input = req.body;
    const mlPayload = {
      age: input.age,
      gender: input.gender,
      height: input.height,
      weight: input.weight,
      calories: input.calories,
      workout_duration: input.workout_duration,
      steps: input.steps,
      sleep_hours: input.sleep_hours,
      water_intake: input.water_intake,
      activity_level: input.activity_level
    };
    const result = await getPrediction(mlPayload);
    const saved = await Prediction.create({
      user_id: input.userId,
      ...mlPayload,
      bmi: result.bmi,
      predicted_fat_loss: result.predicted_fat_loss,
      predicted_weight_loss: result.predicted_weight_loss,
      confidence_score: result.confidence_score
    });
    res.status(201).json({ prediction: result, historyId: saved.id });
  } catch (error) {
    next(error);
  }
}

module.exports = { createPrediction };

