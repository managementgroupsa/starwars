const axios = require('axios');
const { EjecutarApi } = require('../../shared/utils');



module.exports.handler = async (event) => {
  try {
    let p_titulo=event.pathParameters.titulo;

    return await EjecutarApi('https://swapi.py4e.com/api/films/'+ p_titulo)

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al llamar a la API externa' }),
    };
  }
};
