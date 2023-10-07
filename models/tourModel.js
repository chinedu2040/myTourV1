const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
  category: {
    type: String,
    required: [true, 'A tour must have a category'],
    enum: ['religious', 'mountain', 'museums', 'sport-related', 'animal-life'],
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description'],
  },
  images: [String], // Array of image URLs
  address: {
    type: String,
    required: [true, 'A tour must have an address'],
  },
  // Add other tour properties
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
