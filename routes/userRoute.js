const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const registerValidationRules = () => [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6, max: 16 }).withMessage('Password must be between 8 and 16 characters'),
];

const userController = require('../controller/userController')

router.post('/register', registerValidationRules(), userController.register);
router.post('/login', userController.login);


module.exports = router