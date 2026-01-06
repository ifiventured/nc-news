//this one isn't right 

const db = require('../db/connection');

const getComments = (req, res, next) => { //does this get comments for a specific article?
    db.query('SELECT * FROM comments;')
        .then((result) => {
            res.status(200).send({ comments: result.rows });
        }) //need something for no comments in an article
        .catch((err) => {
            next(err);
        });
};
//need a se[arate model!
module.exports = { getComments };