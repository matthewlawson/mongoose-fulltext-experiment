const mongoose = require('mongoose');

var schema = mongoose.Schema({
  id: String,
  name: { $type: String },
  geo: { type: String, coordinates: [Number] },
  version: { $type: Number }

}, { typeKey: '$type' });


schema.index(
  {
    "name": "text",
    "address.building": "text",
    "address.town": "text",
    "address.street": "text",
    "address.county": "text",
    "address.postcode": "text",
    "address.country": "text"
  },
  {
    name: 'TextIndex_mongoose', weights: { "name": 10, "address.town": 5, "address.county": 4 }
  }
);

schema.index(
  { "geo": "2dsphere" }
)

schema.index({ "id": 1 }, { "unique": true });

module.exports = mongoose.model('Restaurant', schema);