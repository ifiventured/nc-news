
//create express. import with require
const express = require('express');
const { getTopics } = require('./controllers/topicsController.js');

const app = express();

app.use(express.json());
//1. get api topics
app.get('/api/topics', getTopics);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ msg: 'Something went wrong!' });
});


// still need to do topics, articles routes then errors - ask about errors

// then articles with queries 

module.exports = app;
