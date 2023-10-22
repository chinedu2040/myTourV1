const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// Define a route for searching by name and category
router.route('/').get(tourController.searchTours);

module.exports = router;
