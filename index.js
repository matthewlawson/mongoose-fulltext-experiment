const mongoose = require('mongoose');

const Restaurant = require('./models/Restaurant');
const Chain = require('./models/Chain');

init();

async function init() {
  try {
    await mongoose.connect('mongodb://localhost/test', { autoIndex: false });
    console.log('connected');
    findRestaurants();
  }
  catch (err) {
    console.log('cannot connect', err);
  }

  
}

async function populate() {
  const chain = new Chain({
    name: "Nandos LTD"
  });

  const savedChain = await chain.save();

  const newRestaurant = new Restaurant({
    id: new Date().toISOString(),
    name: 'Nandos',
    version: { versionId: "2", lastUpdated: new Date() },
    chain: savedChain._id,
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

async function findRestaurants() {
  
  const chain = await Chain.findOne({"name": "Nandos LTD"});
  const aggregate = await Restaurant.aggregate([{
    $geoNear: {
      spherical: true,
      near: {
        "type": "Point",
        "coordinates": [
          56.67275,
          -6.597857
        ]
      },
      distanceField: "dist", // required
      maxDistance: 0.008,
      query: {"chain": chain._id}
    }
  }]);

  const restaurants = await Restaurant.populate(aggregate, {path: 'chain'});
  console.log(restaurants);
}

async function findByChain() {
  const chain = await Chain.findOne({"name": "Nandos LTD"});

  const restaurant = await Restaurant.findOne({"chain": chain._id}).populate('chain');

  console.log(restaurant);
}
