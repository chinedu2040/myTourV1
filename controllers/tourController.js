const Tour = require('../models/tourModel');

// Function to fetch suggested tours by category
const fetchSuggestedTours = async (category) => {
  try {
    const suggestedTours = await Tour.find({ category });
    return suggestedTours.map((tour) => tour.name);
  } catch (error) {
    console.error('Error fetching suggested tours:', error);
    return [];
  }
};

// Get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    const toursWithSuggestions = [];

    for (const tour of tours) {
      const { _id, name, category, description, images } = tour;
      const suggestedTours = await fetchSuggestedTours(category);

      toursWithSuggestions.push({
        _id,
        name,
        category,
        description,
        images,
        suggestedTours,
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tours: toursWithSuggestions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Get a specific tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }

    const suggestedTours = await fetchSuggestedTours(tour.category);

    res.status(200).json({
      status: 'success',
      data: {
        tour: {
          _id: tour._id,
          name: tour.name,
          category: tour.category,
          description: tour.description,
          images: tour.images,
          suggestedTours: suggestedTours,
          address: tour.address
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Create a new tour
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    // Fetch suggested tours by the category of the newly created tour
    const suggestedTours = await fetchSuggestedTours(newTour.category);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
        suggestedTours: suggestedTours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Update a tour by ID
exports.updateTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    const updatedTour = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Get suggested tours by category
exports.getSuggestedTours = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const suggestedTours = await Tour.find({ category: categoryId });

    res.status(200).json({
      status: 'success',
      data: {
        suggestedTours,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// In tourController.js

exports.searchTours = async (req, res) => {
  try {
    const { name, category } = req.query;

    // Create a query object to filter tours
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    // Use the query object to find matching tours in your database
    const tours = await Tour.find(query);

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  }  catch (err) {
    res.status(500).json({
      status: 'error',
      message: `Error: ${err.message}`,
    });
  }
  
  
};
