
const connectionConfig = {
    host: 'starwars.clcfiztqrjny.us-east-2.rds.amazonaws.com',
    user: 'admin',
    port: 3306,
    password: '1q2w3e4r5t.',
    database: 'starwars',
  };


const stringconection = () => {
    return connectionConfig;
};



module.exports = {
    
    stringconection,
 
}; 
