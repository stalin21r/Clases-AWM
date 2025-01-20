const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

require('./server/config/Mongoose.config');
app.use(cors());

app.use(express.json(), express.urlencoded({ extended: true }));

const Rutas = require('./server/routes/Restaurantes.routes')(app);


app.listen(port, function() {
  console.log('app.js escuchando en el puerto', port);
});