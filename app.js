const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config.js'); 

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

//execute deploy AWS: npx serverless deploy

//execute offline: npx serverless offline
//execute: npx mocha tests/getEspecies.test.js
//execute: npx mocha tests/getEspeciesPornombre.test.js

//execute swagger: node app.js
// swagger: http://localhost:5000/api-docs/#/