const {
    selectCommentsByArticleId,
    insertCommentByArticleId,
} = require("../models/commentsModel");

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    selectCommentsByArticleId(article_id)
        .then((comments) => {
            res.status(200).send({ comments });
        })
        .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;

    if (!username || typeof username !== "string" || username.trim() === "") {
        return res.status(400).send({ msg: "Bad request" });
    }

    if (!body || typeof body !== "string" || body.trim() === "") {
        return res.status(400).send({ msg: "Bad request" });
    }

    insertCommentByArticleId(article_id, username.trim(), body.trim())
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch(next);
};
