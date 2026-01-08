const db = require("../db/connection");

exports.selectArticles = () => {
    const queryStr = `
    SELECT articles.author,
           articles.title,
           articles.article_id,
           articles.topic,
           articles.created_at,
           articles.votes,
           articles.article_img_url,
           COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments
      ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
  `;
    return db.query(queryStr).then(({ rows }) => rows);
};

exports.selectArticleById = (article_id) => {
    const queryStr = `
    SELECT *
    FROM articles
    WHERE article_id = $1;
  `;

    return db.query(queryStr, [article_id]).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found" });
        }
        return rows[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
    const queryStr = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
  `;

    return db.query(queryStr, [inc_votes, article_id]).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article not found" });
        }
        return rows[0];
    });
};
