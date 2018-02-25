const mongoose = require('mongoose');

const Restaurant = require('./models/Restaurant');

init();

async function init() {
  try {
    await mongoose.connect('mongodb://localhost/test', { autoIndex: false });
    console.log('connected');
  }
  catch (err) {
    console.log('cannot connect', err);
  }

  const newRestaurant = new Restaurant({
    name: 'Pizza Express',
    version: 2,
    "geo": {
      "type": "Point",
      "coordinates": [
        56.67275,
        -6.597857
      ]
    }
  });

  const savedRestaurant = await newRestaurant.save();
  console.log(savedRestaurant);

  const restaurants = await Restaurant.find();
  console.log(restaurants);
}
