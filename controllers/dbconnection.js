// connect to postgres

const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';
const connection = new Pool({
    user: 'camer',
    password: 'password', //should this be here? how do I know if it's the right password?
    host: 'localhost',
    port: 5432,
    database: ENV === 'test' ? 'nc_news_test' : 'nc_news', //is this where the "something went wrong error is coming from?"
});

module.exports = connection;
