const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/articles", () => {
    it("200: responds with array of articles, sorted by date desc, each with correct properties and comment_count", async () => {
        const response = await request(app).get("/api/articles");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.articles)).toBe(true);
        expect(response.body.articles.length).toBeGreaterThan(0);

        expect(response.body.articles).toBeSortedBy("created_at", {
            descending: true,
        });

        response.body.articles.forEach(article => {
            expect(article).toEqual(
                expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number)
                })
            );
            expect(article.body).toBeUndefined();
        });
    });
});

describe("GET /api/articles/:article_id", () => {
    it("200: returns a single full article when passed a valid ID", async () => {
        const response = await request(app).get("/api/articles/1");
        expect(response.status).toBe(200);
        expect(response.body.article).toEqual(
            expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
                topic: expect.any(String),
                article_id: 1,
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            })
        );
    });

    it("404: valid ID but article does not exist", async () => {
        const response = await request(app).get("/api/articles/9999");
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Article not found");
    });

    it("400: invalid ID", async () => {
        const response = await request(app).get("/api/articles/not-an-id");
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Invalid article_id");
    });
});
