const mongoose = require('mongoose');
const RestauranteSchema = new mongoose.Schema({
  nombre:{
    type: String,
    require:[true, "El restaurante debe tener un nombre"]
  },
  tipo:{
    type: String,
    require:[true, "El restaurante debe tener un tipo"]
  },
  horario:{
    type: String,
    require:[true, "El restaurante debe tener un horario"]
  },
  imagen:{
    type: String,
    require:[true, "El restaurante debe tener una imagen"]
  }
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema);
module.exports = Restaurante;