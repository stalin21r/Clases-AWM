const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Requiere la configuración de la base de datos para que se ejecute la sincronización de modelos
require('./config/db.config');

// Middleware
app.use(cors(), express.json(), express.urlencoded({ extended: true }));

// Requiere las rutas de Usuario
require('./routes/Plato.Routes')(app);
require('./routes/Restaurante.Routes')(app);
require('./routes/Menu.Routes')(app);

// Inicia el servidor después de que la base de datos esté sincronizada
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
