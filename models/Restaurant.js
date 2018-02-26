const mongoose = require('mongoose');
const Chain = require('./Chain');


const versionSchema = new mongoose.Schema({ versionId: Number, lastUpdated: Date }, {_id: false});
const geoJSONPoint = new mongoose.Schema({type: {$type: String, enum: ['Point']}, coordinates: [Number]}, { typeKey: '$type', _id: false });

const restaurantSchema = mongoose.Schema({
  id: String,
  name: String,
  geo: geoJSONPoint,
  version: versionSchema,
  chain: {$type: mongoose.Schema.Types.ObjectId, ref: 'Chain'}
}, { typeKey: '$type' });


restaurantSchema.index(
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

restaurantSchema.index(
  { "geo": "2dsphere" }
)

restaurantSchema.index({"version.versionId": 1});
restaurantSchema.index({"version.lastUpdated": 1});

restaurantSchema.index({ "id": 1 }, { "unique": true });

module.exports = {
  mongoose.model('Restaurant', restaurantSchema);