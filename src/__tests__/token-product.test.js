const request = require("supertest");

const { createApp } = require("../../app");
const { AppDataSource } = require("../models/datasource");

describe("TOKEN PRODUCT EXCHANGE", () => {
    let app;

    beforeAll(async () => {
        app = createApp;
        AppDataSource.initialize();
    });

    afterAll(async () => {
        AppDataSource.destroy();
    });

    test("SUCCESS: TOKEN PRODUCT EXCHANGE", async () => {
        await request(app)
        .post("/order")
        .send({ userId:99, token:1, productId:1 })
        .expect(201)
        .expect({ message: productName + " PURCHASE COMPLETE" })
    });

    test("FAIL: TOKEN PRODUCT EXCHANGE - LACK OF TOKEN", async () => {
        await request(app)
        .post("/order")
        .send({ userId:99, token:49, productId:2 })
        .expect(400)
        .expect({ message: " LACK OF TOKEN " })
    });
})