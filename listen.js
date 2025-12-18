// separate listen file
// start server + connect database
// nothing else needed - don't listen to database from here - use sql models

const app = require('./app');
const { PORT = 9090 } = process.env;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

