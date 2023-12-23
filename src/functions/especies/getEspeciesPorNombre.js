const mysql = require('mysql');
const { stringconection } = require('../../shared/connectionstring');
const { ExecuteQuery, SplitUrlToArray } = require('../../shared/utils');



/**
 * @swagger
 * /dev/listarespecies/{nombre}:
 *   get:
 *     summary: Obtiene una especie por nombre
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre de la especie a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
module.exports.handler = async (event) => {

  const connection = mysql.createConnection(stringconection());

  let p_nombre = event.pathParameters.nombre;

  try {

    if (!isNaN(p_nombre)) {
      const response = {
        statusCode: 400,
        body: JSON.stringify({ error: "El valor de 'nombre' es numérico." }),
      };
      return response;
    }


    let sql = `CALL starwars.sp_especies ('BUSCARREGISTRO',0,'${p_nombre}','','','','','','','','','',0,0,'',null,null)`;

    await connection.connect();

    const results = await ExecuteQuery(connection, sql);

    let id_especie = 0;
    for (const item of results[0]) {
      id_especie = item.id;
    }


    let sqlPersonas = `CALL starwars.sp_listas ('BUSCARREGISTRO','SP','PE',${id_especie},0,'')`;
    const resultsPersonas = await ExecuteQuery(connection, sqlPersonas);

    let sqlPeliculas = `CALL starwars.sp_listas ('BUSCARREGISTRO','SP','FI',${id_especie},0,'')`;
    const resultsPeliculas = await ExecuteQuery(connection, sqlPeliculas);

    const arrPersonas = SplitUrlToArray(resultsPersonas);
    const arrPeliculas = SplitUrlToArray(resultsPeliculas);


    const especies = results[0].map((especie) => ({
      id: especie.id,
      nombre: especie.nombre,
      clasificacion: especie.pelicula_titulo,
      designacion: especie.designacion,
      promedio_altura: especie.promedio_altura,
      promedio_tiempovida: especie.promedio_tiempovida,
      color_ojos: especie.color_ojos,
      color_cabello: especie.color_cabello,
      color_piel: especie.color_piel,
      lenguaje: especie.lenguaje,
      mundonatal: especie.mundonatal,
      url: especie.pelicula_titulo,
      creado: especie.pelicula_titulo,
      editado: especie.pelicula_titulo,
      personas: arrPersonas[especie.id] || [],
      peliculas: arrPeliculas[especie.id] || [],
    }));

    const responseBody = {
      status: 'success',
      message: 'La solicitud se completó exitosamente.',
      data: especies
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

