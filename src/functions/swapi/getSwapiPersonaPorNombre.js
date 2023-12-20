const axios = require('axios');
const { EjecutarApi } = require('../../shared/utils');


module.exports.handler = async (event) => {
  try {
    let p_nombre=event.pathParameters.nombre;

    return await EjecutarApi('https://swapi.py4e.com/api/people/'+ p_nombre)

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al llamar a la API externa' }),
    };
  }
};

