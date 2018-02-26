const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

init();

async function init() {
  try {
    await mongoose.connect('mongodb://localhost/test', { autoIndex: true });
    console.log('connected');
  }
  catch (err) {
    console.log('cannot connect', err);
  }
}