const RestauranteController = require('../controllers/Restaurante.Controller');

module.exports = function(app) {
  app.post('/restaurantes',  RestauranteController.createRestaurante); // Crear restaurante
  app.get('/restaurantes', RestauranteController.obtainRestaurantes); // Obtener todos los restaurantes
  app.get('/restaurantes/:id', RestauranteController.obtainRestauranteById); // Obtener restaurante por ID
  app.put('/restaurantes/:id',  RestauranteController.updateRestauranteById); // Actualizar restaurante por ID
  app.delete('/restaurantes/:id',  RestauranteController.deleteRestauranteById); // Eliminar restaurante por ID
};
