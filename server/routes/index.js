const express = require('express');
const sendEmailMessage = require('../controllers/sendgrid');

const router = express.Router();

// User routes
const sendgridRoutes = `/sendgrid`;
router.post(`${sendgridRoutes}/send`, sendEmailMessage);

module.exports = router;
