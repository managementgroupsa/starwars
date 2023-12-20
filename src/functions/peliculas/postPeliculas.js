const mysqlTx = require('mysql2/promise');

const { stringconection } = require('../../shared/connectionstring');
const { executeQueryTx, startTransaction, commitTransaction, rollbackTransaction } = require('../../shared/utils');


async function executeGrabaCabecera(connection, objeto) {

  let query = `CALL starwars.sp_peliculas (
    '${objeto.accion ?? ''}',
    '${objeto.id ?? 0}',
    '${objeto.titulo ?? ''}',
    '${objeto.id_episodio ?? 0}',
    '${objeto.apertura ?? ''}',
    '${objeto.director ?? ''}',
    '${objeto.produccion ?? ''}',
    '${objeto.fecha_realizacion ?? null}',
    '${objeto.especies ?? ''}',
    '${objeto.estelares ?? ''}',
    '${objeto.vehiculos ?? ''}',
    '${objeto.caracteres ?? ''}',
    '${objeto.planetas ?? ''}',
    '${objeto.url ?? ''}',
    '${objeto.creado ?? null}',
    '${objeto.editado ?? null}'
      )`;


  try {
    const [results] = await executeQueryTx(connection, query);
    const cabeceraId = results[0].id;

    return cabeceraId;
  } catch (error) {
    throw error;
  }
}

async function executeGrabaPlanetas(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.planetas.length; i++) {

      const url = objeto.planetas[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','FI','PL',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function executeGrabaEspecies(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.especies.length; i++) {

      const url = objeto.especies[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','FI','SP',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function executeGrabaEstelares(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.estelares.length; i++) {

      const url = objeto.estelares[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','FI','ST',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function executeGrabaVehiculos(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.vehiculos.length; i++) {

      const url = objeto.vehiculos[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','FI','VE',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function executeGrabaCaracteres(connection, cabeceraId, objeto) {

  try {
    for (let i = 0; i < objeto.caracteres.length; i++) {

      const url = objeto.caracteres[i];

      const query = `CALL starwars.sp_listas ('INSERTAR','FI','CH',${cabeceraId},${i},'${url}')`;

      await executeQueryTx(connection, query);
    }
  } catch (error) {
    throw error;

  }
}

async function GrabaPeliculas(objeto) {
  let connection;

  try {
    // Crear una conexión a la base de datos
    connection = await mysqlTx.createConnection(stringconection());

    // Iniciar transacción
    await startTransaction(connection);

    console.log('ejecuta cabecera');

    // Ejecutar procedimiento de cabecera
    const cabeceraId = await executeGrabaCabecera(connection, objeto);

    // Ejecutar procedimiento de PLANETAS - 1
    try {
      await executeGrabaPlanetas(connection, cabeceraId, objeto);

      try {
        // Ejecutar procedimiento de ESPECIES - 2
        await executeGrabaEspecies(connection, cabeceraId, objeto);

        try {
          // Ejecutar procedimiento de ESTELARES - 3
          await executeGrabaEstelares(connection, cabeceraId, objeto);

          try {
            // Ejecutar procedimiento de VEHICULOS - 4
            await executeGrabaVehiculos(connection, cabeceraId, objeto);

            try {
              // Ejecutar procedimiento de CARACTERES - 5
              await executeGrabaCaracteres(connection, cabeceraId, objeto);

            } catch (error) {

              await rollbackTransaction(connection);
              throw error;
            }
          } catch (error) {

            await rollbackTransaction(connection);
            throw error;
          }
        } catch (error) {

          await rollbackTransaction(connection);
          throw error;
        }

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
 * /dev/peliculas:
 *   post:
 *     summary: Permite Grabar, Editar o eliminar una pelicula
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
 *               titulo:
 *                 type: string
 *               id_episodio:
 *                 type: integer
 *               apertura:
 *                 type: string 
 *               director:
 *                 type: string
 *               produccion:
 *                 type: string
 *               fecha_realizacion:
 *                 type: string
 *               especies:
 *                 type: string
 *               estelares:
 *                 type: string
 *               vehiculos:
 *                 type: string
 *               caracteres:
 *                 type: string
 *               planetas:
 *                 type: string
 *               url:
 *                 type: string
 *               creado:
 *                 type: string
 *               editado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
module.exports.handler = async (event) => {
  const objeto = JSON.parse(event.body);

  try {
    await GrabaPeliculas(objeto);

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
