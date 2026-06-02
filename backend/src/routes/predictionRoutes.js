const router = require('express').Router();
const { createPrediction } = require('../controllers/predictionController');
const { predictionRules } = require('../utils/validators');
const validate = require('../middleware/validate');

router.post('/', predictionRules, validate, createPrediction);

module.exports = router;

