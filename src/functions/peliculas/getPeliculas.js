const mysql = require('mysql');
const {stringconection} = require('../../shared/connectionstring');
const { ExecuteQuery, SplitUrlToArray } = require('../../shared/utils');

/**
 * @swagger
 * /dev/listarpeliculas:
 *   get:
 *     summary: Obtiene la lista de peliculas
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
module.exports.handler = async (event) => {

  const connection = mysql.createConnection(stringconection());

  try {
    
    let sql = `CALL starwars.sp_peliculas ('BUSCARTODOS',0,'',0,'','','',null,'','','','','','',null,null)`;

    await connection.connect();

    const results = await ExecuteQuery(connection, sql);

    let sqlCaracteristicas = `CALL starwars.sp_listas ('BUSCARTODOS','FI','CH',0,0,'')`;
    const resultsCaracteristicas = await ExecuteQuery(connection, sqlCaracteristicas);

    let sqlPlanetas = `CALL starwars.sp_listas ('BUSCARTODOS','FI','PL',0,0,'')`;
    const resultsPlanetas = await ExecuteQuery(connection, sqlPlanetas);

    let sqlEstelares = `CALL starwars.sp_listas ('BUSCARTODOS','FI','ST',0,0,'')`;
    const resultsEstelares = await ExecuteQuery(connection, sqlEstelares);


    let sqlVehiculos = `CALL starwars.sp_listas ('BUSCARTODOS','FI','VE',0,0,'')`;
    const resultsVehiculos = await ExecuteQuery(connection, sqlVehiculos);

    let sqlEspecies = `CALL starwars.sp_listas ('BUSCARTODOS','FI','SP',0,0,'')`;
    const resultsEspecies = await ExecuteQuery(connection, sqlEspecies);


    const arrCaracteristicas = SplitUrlToArray(resultsCaracteristicas);
    const arrPlanetas = SplitUrlToArray(resultsPlanetas);   
    const arrEstelares = SplitUrlToArray(resultsEstelares);
    const arrVehiculos = SplitUrlToArray(resultsVehiculos);   
    const arrEspecies = SplitUrlToArray(resultsEspecies);
          
    const peliculas = results[0].map((pelicula) => ({
      id: pelicula.id,
      titulo: pelicula.titulo,
      id_episodio: pelicula.id_episodio,
      apertura: pelicula.apertura,
      director: pelicula.director,
      produccion: pelicula.produccion,
      fecha_realizacion: pelicula.fecha_realizacion,
      url: pelicula.pelicula_titulo,
      creado: pelicula.pelicula_titulo,
      editado: pelicula.pelicula_titulo,
      planetas: arrPlanetas[pelicula.id] || [],
      especies: arrEspecies[pelicula.id] || [],
      estelares: arrEstelares[pelicula.id] || [],
      vehiculos: arrVehiculos[pelicula.id] || [],
      caracteres: arrCaracteristicas[pelicula.id] || [],
      
    }));    

    const responseBody = {
      status: 'success',
      message: 'La solicitud se completó exitosamente.',
      data: peliculas
    };
    
    
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor.' }),
    };
  } finally {
    connection.end();
  }
};
