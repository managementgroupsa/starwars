const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SWAPI',
      version: '1.0.0',
      description: 'API de integración y consultas ',
    },

    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Servidor de producción.',
      },
    ],
  
  },


  apis: ['src/functions/especies/*.js','src/functions/peliculas/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
