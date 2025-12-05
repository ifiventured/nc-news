/* import database connection
get topics from database (query database then return json object)
*/

const db = require('./dbconnection');

const getTopics = (req, res, next) => {
    db.query('SELECT * FROM topics;')
        .then((result) => {
            res.status(200).send({ topics: result.rows });
        })
        .catch((err) => {
            next(err);
        });
};

module.exports = { getTopics };