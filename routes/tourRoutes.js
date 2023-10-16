const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();

// Define routes for CRUD operations (Create, Read, Update, Delete)
router
  .route('/')
  .get(
    tourController.getAllTours)
  .post(
    tourController.createTour
    );

router
// protect this route and restrict it to both user and admin
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    tourController.getTourById)

  .patch(
    tourController.updateTour
    )
    
// Get suggested tours based on category
router
// protect this route and restrict it to both user and admin
.route('/suggested/:categoryId')
.get(
  authController.protect,
  authController.restrictTo('user'),
  tourController.getSuggestedTours);

module.exports = router;
