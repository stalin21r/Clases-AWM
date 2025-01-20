const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nianEC')
.then((result) => {
  console.log("conectado a la bd");
}).catch((err) => {
  console.log("Error", err);
});