const mysql = require('mysql');
const {stringconection} = require('../../shared/connectionstring');
const { ExecuteQuery, SplitUrlToArray } = require('../../shared/utils');



/**
 * @swagger
 * /dev/listarpeliculas/{titulo}:
 *   get:
 *     summary: Obtiene una pelicula por titulo
 *     parameters:
 *       - in: path
 *         name: titulo
 *         required: true
 *         description: Titulo de la pelicula a buscar
 *         schema:
 *           type: string 
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
module.exports.handler = async (event) => {

  const connection = mysql.createConnection(stringconection());

  let p_titulo=event.pathParameters.titulo;

  try {

    if (!isNaN(p_titulo)) {
      const response = {
        statusCode: 400,
        body: JSON.stringify({ error: "El valor de 'titulo' es numérico" }),
      };
      return response;
    }

    let sql = `CALL starwars.sp_peliculas ('BUSCARREGISTRO',0,'${p_titulo}',0,'','','',null,'','','','','','',null,null)`;

    await connection.connect();

    const results = await ExecuteQuery(connection, sql);

    let  id_pelicula = 0;
    for (const item of results[0]) {
      id_pelicula= item.id;
    }


    let sqlCaracteristicas = `CALL starwars.sp_listas ('BUSCARREGISTRO','FI','CH',${id_pelicula},0,'')`;
    const resultsCaracteristicas = await ExecuteQuery(connection, sqlCaracteristicas);

    let sqlPlanetas = `CALL starwars.sp_listas ('BUSCARREGISTRO','FI','PL',${id_pelicula},0,'')`;
    const resultsPlanetas = await ExecuteQuery(connection, sqlPlanetas);

    let sqlEstelares = `CALL starwars.sp_listas ('BUSCARREGISTRO','FI','ST',${id_pelicula},0,'')`;
    const resultsEstelares = await ExecuteQuery(connection, sqlEstelares);


    let sqlVehiculos = `CALL starwars.sp_listas ('BUSCARREGISTRO','FI','VE',${id_pelicula},0,'')`;
    const resultsVehiculos = await ExecuteQuery(connection, sqlVehiculos);

    let sqlEspecies = `CALL starwars.sp_listas ('BUSCARREGISTRO','FI','SP',${id_pelicula},0,'')`;
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
      message: 'La solicitud se completó exitosamente',
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
      body: JSON.stringify({ message: 'Error interno del servidor' }),
    };
  } finally {
    connection.end();
  }
};

