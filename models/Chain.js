const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  id: String,
  href: String
}, {_id: false});

const chainSchema = mongoose.Schema({
  id: String,
  name: String,
  numberOfRestaurants: Number,
  cuisines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine' }],
  images: [imageSchema],
  primaryImage: imageSchema,
  description: String
});

chainSchema.index({ "id": 1 }, { "unique": true });

module.exports = mongoose.model('Chain', chainSchema);