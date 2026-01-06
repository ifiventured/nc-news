//connection between node and database - defines how app connects 

const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || 'development'

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` })

//create connection pool 

const db = new Pool();

if (!process.env.PGDATABASE) {
    throw new Error("No PGDATABASE configured")
} else {
    console.log(`Connected to ${process.env.PGDATABASE}`)
}


module.exports = db;