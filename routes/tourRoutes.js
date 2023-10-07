const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// Define routes for CRUD operations (Create, Read, Update, Delete)
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour);

// Get suggested tours based on category
router
.route('/suggested/:categoryId')
.get(tourController.getSuggestedTours);

module.exports = router;
