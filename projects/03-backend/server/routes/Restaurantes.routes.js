const RestauranteController = require('../controllers/Restaurante.Controller');
const AuthController = require('../controllers/Autenticacion.Controller');
const { VerificarToken } = require('../middlewares/Auth.Middleware');
const { VerificarAdministrador } = require('../middlewares/RolVerifier.Middleware');

module.exports = function(app) {
  app.post('/restaurantes',  RestauranteController.createRestaurante);
  app.get('/restaurantes', RestauranteController.obtainRestaurantes); // Obtener todos los restaurantes
  app.get('/restaurantes/:id', RestauranteController.obtainRestauranteById); // Obtener restaurante por ID
  app.put('/restaurantes/:id',  RestauranteController.updateRestauranteById); // Actualizar restaurante por ID
  app.delete('/restaurantes/:id',  RestauranteController.deleteRestauranteById); // Eliminar restaurante por ID
  app.post('/login', AuthController.login);
  app.post('/register', AuthController.register);
};
