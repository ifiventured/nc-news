const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
  const sql = `
    SELECT comment_id, votes, created_at, author, body, article_id
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
  `;
  return db.query(sql, [article_id]).then(({ rows }) => rows);
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  const sql = `
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING comment_id, votes, created_at, author, body, article_id;
  `;
  return db.query(sql, [username, body, article_id]).then(({ rows }) => rows[0]);
};
