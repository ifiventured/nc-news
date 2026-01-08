const express = require("express");
const cors = require("cors");

const { getTopics } = require("./controllers/topicsController");

const {
    getArticles,
    getArticleById,
    patchArticleVotes,
} = require("./controllers/articlesController");

const { getCommentsByArticleId } = require("./controllers/commentsController");

const {
    handleNotFound,
    handlePsqlErrors,
    handleCustomErrors,
    handleServerErrors,
} = require("./errors/errors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleVotes);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.all(/.*/, handleNotFound);

// error handlers
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
