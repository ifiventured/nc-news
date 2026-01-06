const express = require('express');
const cors = require("cors");
app.use(cors());


// Controllers
const { getTopics } = require('./controllers/topicsController');
const { getArticles, getArticleById } = require('./controllers/articlesController');

const app = express();

app.use(express.json());
//routes
app.get('/api/topics', getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById)
//errors 
// psql 
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        return res.status(400).send({ msg: 'Bad request' });
    }
    next(err);
});

// objects 
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ msg: 'Internal server error' });
});

app.use(express.static('public'))


module.exports = app;
