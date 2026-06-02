const router = require('express').Router();
const { register, login, logout } = require('../controllers/authController');
const { registerRules, loginRules } = require('../utils/validators');
const validate = require('../middleware/validate');

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.post('/logout', logout);

module.exports = router;

