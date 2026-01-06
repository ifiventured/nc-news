const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
    it("200: responds with an array of topics with correct properties", async () => {
        const res = await request(app).get("/api/topics").expect(200);

        expect(Array.isArray(res.body.topics)).toBe(true);

        res.body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
            expect(topic).toHaveProperty("img_url");
        });
    });
});
