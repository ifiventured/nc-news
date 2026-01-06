const express = require("express");
const cors = require("cors");

// controllers
const { getTopics } = require("./controllers/topicsController");
const { getArticles, getArticleById } = require("./controllers/articlesController");

// error handlrs
const {
    handlePsqlErrors,
    handleCustomErrors,
    handleServerErrors,
    handleNotFound,
} = require("./errors/errors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// api root
app.get("/api", (req, res) => {
    res.status(200).send({
        endpoints: {
            "GET /api": "list endpoints",
            "GET /api/topics": "get topics",
            "GET /api/articles": "get articles",
            "GET /api/articles/:article_id": "get article by id",
        },
    });
});

// routes
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);




// errors
app.all(/.*/, handleNotFound);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
