const { Pool } = require('pg');                         //installed library to make queries

const PG_HOST = 'localhost';                            //required detail to enter in database server and database
const PG_PORT = 5432;
const PG_DATABASE = 'final-project-music-albums';
const PG_USER = 'discogServer';
const PG_PASSWORD = '123456';

const pool = new Pool({                                 //making connection with database
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD
});

module.exports = {
    query : (sqlStatement) => {
        return pool.query(sqlStatement) // promise
    }
};