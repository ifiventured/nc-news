const seed = require('./db/seeds/seed');
const { topicData, userData, articleData, commentData } = require('./data');

seed({ topicData, userData, articleData, commentData })
    .then(() => {
        console.log('Database seeded successfully!');
    })
    .catch((err) => {
        console.error('Error during seeding:', err);
    });
