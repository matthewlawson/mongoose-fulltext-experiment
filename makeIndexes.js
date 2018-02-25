const mongoose = require('mongoose');
const Cat = require('./models/Cat');
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