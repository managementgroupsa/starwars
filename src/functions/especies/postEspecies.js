const mysqlTx = require('mysql2/promise');

const { stringconection } = require('../../shared/connectionstring');
const { executeQueryTx, startTransaction, commitTransaction, rollbackTransaction } = require('../../shared/utils');


async function executeGrabaCabecera(connection, objeto) {

  let query = `CALL starwars.sp_especies ('${objeto.accion ?? ''}',${objeto.id ?? 0},'${objeto.nombre ?? ''}',
  '${objeto.clasificacion ?? ''}','${objeto.designacion ?? ''}',
  '${objeto.promedio_altura ?? ''}','${objeto.promedio_tiempovida ?? ''}',
  '${objeto.color_ojos ?? ''}','${objeto.color_cabello ?? ''}',
  '${objeto.color_piel ?? ''}','${objeto.lenguaje ?? ''}',
  '${objeto.mundonatal ?? ''}','${objeto.url ?? ''}',
  0,0,
  ${objeto.creado ?? null},${objeto.editado ?? null})`;

  try {
    const [results] = await executeQueryTx(connection, query);
    const cabeceraId = results[0].id;

    return cabeceraId;
  } catch (error) {
    throw error;
  }
}

async function executeGrabaPersonas(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.personas.length; i++) {

      const url = objeto.personas[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','SP','PE',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function executeGrabaPeliculas(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.peliculas.length; i++) {

      const url = objeto.peliculas[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','SP','FI',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function GrabaEspecies(objeto) {
  let connection;

  try {
    // Crear una conexión a la base de datos
    connection = await mysqlTx.createConnection(stringconection());

    // Iniciar transacción
    await startTransaction(connection);

    console.log('ejecuta cabecera');

    // Ejecutar procedimiento de cabecera
    const cabeceraId = await executeGrabaCabecera(connection, objeto);

    // Ejecutar procedimiento de personas
    try {
      await executeGrabaPersonas(connection, cabeceraId, objeto);

      try {
        // Ejecutar procedimiento de peliculas
        await executeGrabaPeliculas(connection, cabeceraId, objeto);

      } catch (error) {

        await rollbackTransaction(connection);
        throw error;
      }

    } catch (error) {

      await rollbackTransaction(connection);
      throw error;
    }

    // Hacer commit de la transacción
    await commitTransaction(connection);

    console.log('Transacción completada con éxito.');
  } catch (error) {
    console.error('Error en la transacción:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    if (connection) {
      connection.end();
    }
  }
}

/**
 * @swagger
 * /dev/especies:
 *   post:
 *     summary: Permite Grabar o Editar una especie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accion:
 *                 type: string
 *               id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               clasificacion:
 *                 type: string
 *               designacion:
 *                 type: string 
 *               promedio_altura:
 *                 type: string
 *               promedio_tiempovida:
 *                 type: string
 *               color_ojos:
 *                 type: string
 *               color_cabello:
 *                 type: string
 *               color_piel:
 *                 type: string
 *               lenguaje:
 *                 type: string
 *               mundonatal:
 *                 type: string
 *               url:
 *                 type: string
 *               creado:
 *                 type: string
 *               editado:
 *                 type: string
 *               gente:
 *                 type: string
 *               pelicula:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
module.exports.handler = async (event) => {
  const objeto = JSON.parse(event.body);

  try {
    await GrabaEspecies(objeto);

    const responseBody = {
      status: 'success',
      message: 'La solicitud se completó exitosamente',
    };

    return {
      status: "success",
      statusCode: 200,
      message: "Ejecución exitosa",
      body: JSON.stringify(responseBody),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor' }),
    };
  }

};
