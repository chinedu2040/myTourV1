const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();

// Define routes for CRUD operations (Create, Read, Update, Delete)
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.createTour
    );

router
  .route('/:id')
  .get(tourController.getTourById)

  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.updateTour
    )
    
// Get suggested tours based on category
router
.route('/suggested/:categoryId')
.get(tourController.getSuggestedTours);

module.exports = router;
