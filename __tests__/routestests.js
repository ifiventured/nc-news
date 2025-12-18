// routetests.js
// Full integration tests for all API routes

const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

// seed test database before all tests
beforeAll(() => seed(testData));

// Close database connection after all tests.
afterAll(() => db.end());
// TOPICS ROUTES
describe("GET /api/topics", () => {
    it("should respond with 200 and a list of topics", async () => {
        const response = await request(app).get("/api/topics");

        // HTTP status
        expect(response.status).toBe(200);

        // Response should be an array of topics.
        expect(response.body.topics).toBeInstanceOf(Array);

        // Each topic should have slug, description, and img_url
        response.body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
            expect(topic).toHaveProperty("img_url");
        });
    });
});

// ARTICLES ROUTES (placeholders)

describe("ARTICLES routes (placeholders)", () => {

    it("GET /api/articles - should respond with 200 and list of articles", async () => {
        // Will work after you implement articlesController & route
        const response = await request(app).get("/api/articles");
        expect(response.status).toBe(200);
        expect(response.body.articles).toBeInstanceOf(Array);
        // Example: check keys once articlesController returns data
        response.body.articles.forEach((article) => {
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("body");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");
        });
    });

    it("GET /api/articles/:article_id - should respond with 200 and single article", async () => {
        // Example using article_id = 1 from test data
        const response = await request(app).get("/api/articles/1");
        expect(response.status).toBe(200);
        expect(response.body.article).toHaveProperty("article_id", 1);
        expect(response.body.article).toHaveProperty("title");
        expect(response.body.article).toHaveProperty("topic");
        expect(response.body.article).toHaveProperty("author");
    });

});
// COMMENTS ROUTES (placeholders)
describe("COMMENTS routes (placeholders)", () => {

    it("GET /api/articles/:article_id/comments - should respond with 200 and list of comments", async () => {
        const response = await request(app).get("/api/articles/1/comments");
        expect(response.status).toBe(200);
        expect(response.body.comments).toBeInstanceOf(Array);
        response.body.comments.forEach(comment => {
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("body");
            expect(comment).toHaveProperty("author");
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("created_at");
        });
    });

});

// USERS ROUTES (placeholders)
describe("USERS routes (placeholders)", () => {

    it("GET /api/users - should respond with 200 and list of users", async () => {
        const response = await request(app).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.body.users).toBeInstanceOf(Array);
        response.body.users.forEach(user => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("avatar_url");
        });
    });

});