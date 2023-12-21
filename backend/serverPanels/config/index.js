const { Pool } = require('pg');

const pool = new Pool({
    user: 'nile_user',
    host: 'localhost',
    database: 'nile',
    password: 'qwepoi@123',
    port: 5433,
});

pool.query('SELECT 1', (err, result) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Connected to the PostgreSQL server');
    }
});

module.exports = pool;


// sajid
