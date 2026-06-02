const { body } = require('express-validator');

const registerRules = [
  body('username').trim().isLength({ min: 3, max: 80 }).withMessage('Username must be 3-80 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginRules = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const predictionRules = [
  body('userId').isInt({ min: 1 }).withMessage('Valid user is required'),
  body('age').isInt({ min: 16, max: 80 }),
  body('gender').isIn(['Male', 'Female', 'Other']),
  body('height').isFloat({ min: 120, max: 230 }),
  body('weight').isFloat({ min: 35, max: 220 }),
  body('calories').isInt({ min: 1000, max: 5000 }),
  body('workout_duration').isInt({ min: 0, max: 240 }),
  body('steps').isInt({ min: 0, max: 40000 }),
  body('sleep_hours').isFloat({ min: 3, max: 12 }),
  body('water_intake').isFloat({ min: 0.5, max: 8 }),
  body('activity_level').isIn(['Low', 'Moderate', 'High'])
];

module.exports = { registerRules, loginRules, predictionRules };

