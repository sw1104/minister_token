const request = require("supertest");

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

describe("TOKEN EXCHANGE", () => {
    let app;

    beforeAll(async()=>{
        app = createApp();
        await AppDataSource.initialize();
    })

    afterAll(async()=>{
        await AppDataSource.destroy();
    })

    test("SUCCESS: TOKEN EXCHANGE", async () => {
        await request(app)
        .get("/token")
        .send({ userId: 100, point: 10000 })
        .expect(200)
        .expect({ message: "TOKEN EXCHANGE SUCCESS" })
    });

    test("FAIL: TOKEN EXCHANGE", async () => {
        await request(app)
        .get("/token")
        .send({ userId: 101, point: 999 })
        .expect(400)
        .expect({ message : "LACK OF POINT" })
    })
});