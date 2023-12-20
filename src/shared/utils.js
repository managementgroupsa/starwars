const axios = require('axios');


const EjecutarApi = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}



const ExecuteQuery = (connection, query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


const SplitUrlToArray =  (data) => {
  try {

    const array = [];
    for (const item of data[0]) {
      array[item.id] = item.urls.split(',');
    }

    return array;

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
}

async function executeQueryTx(connection, query, params) {
  try {
      const [results] = await connection.execute(query, params);
      return results;
  } catch (error) {
      throw error;
  }
}

// Función para iniciar una transacción
async function startTransaction(connection) {
  try {
      await connection.beginTransaction();
  } catch (error) {
      throw error;
  }
}

// Función para hacer commit de la transacción
async function commitTransaction(connection) {
  try {
      await connection.commit();
  } catch (error) {
      throw error;
  }
}

// Función para hacer rollback de la transacción
async function rollbackTransaction(connection) {
  try {
      await connection.rollback();
  } catch (error) {
      throw error;
  }
}

module.exports = {
  ExecuteQuery, 
  EjecutarApi, 
  SplitUrlToArray,
  executeQueryTx,
  startTransaction,
  commitTransaction,
  rollbackTransaction
};