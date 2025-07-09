const express = require('express');
const { submitRating } = require('../controllers/ratingController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
router.post('/', authenticate, authorizeRoles('Normal User'), submitRating);

module.exports = router;
