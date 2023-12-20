const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config.js'); 

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

//execute: node app.js