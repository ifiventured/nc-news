const {
    selectArticles,
    selectArticleById
} = require("../models/articlesModel");

exports.getArticles = (req, res, next) => {
    selectArticles()
        .then((articles) => res.status(200).send({ articles }))
        .catch(next);
};

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;

    if (isNaN(article_id)) {
        return res.status(400).send({ msg: "Invalid article_id" });
    }

    selectArticleById(article_id)
        .then((article) => res.status(200).send({ article }))
        .catch(next);
};
