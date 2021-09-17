var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FivePointTestDB')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));