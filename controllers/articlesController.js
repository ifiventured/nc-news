// all articles

const db = require('./dbconnection');

const getArticles = (req, res, next) => {
    db.query('SELECT * FROM articles;')
        .then((result) => {
            res.status(200).send({ articles: result.rows });
        })
        .catch((err) => {
            next(err);
        });
};

// 2. GET /api/articles/:article_id - responds with a single article by article_id

const getArticleById = (req, res, next) => {
}

// articles comments

// filter and sort

module.exports = { getArticles };