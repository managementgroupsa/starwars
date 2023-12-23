const mysqlTx = require('mysql2/promise');

const { stringconection } = require('../../shared/connectionstring');
const { executeQueryTx, startTransaction, commitTransaction, rollbackTransaction } = require('../../shared/utils');


async function executeEliminaCabecera(connection, objeto) {

  let query = `CALL starwars.sp_especies ('ELIMINAR',${objeto.id ?? 0},
  '','','','','',
  '','','','','',
  0,0,'', null,null)`;

  try {
    await executeQueryTx(connection, query);

    return true;

  } catch (error) {
    throw error;
  }
}


async function EliminaEspecies(objeto) {
  let connection;

  try {
    // Crear una conexión a la base de datos
    connection = await mysqlTx.createConnection(stringconection());

    // Iniciar transacción
    await startTransaction(connection);


    try {
      // Ejecutar procedimiento de cabecera
      await executeEliminaCabecera(connection, objeto);

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
 *   delete:
 *     summary: Permite Eliminar una especie
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
    await EliminaEspecies(objeto);

    const responseBody = {
      status: 'success',
      message: 'La solicitud se completó exitosamente.',
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
