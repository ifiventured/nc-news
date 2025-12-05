// start server + connect database

require('dotenv').config();

const app = require('./app');
const { PORT = 9090 } = process.env;
const db = require('./controllers/dbconnection');
db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
