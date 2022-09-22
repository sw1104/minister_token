const request = require("supertest");

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

describe("POINT GET TEST", () => {
    let app;

    beforAll(async () => {
        app = createApp;
        await AppDataSource.initialized();
    })

    afterAll(async () => {
        await AppDataSource.destroy();
    })
    
    test("SUCCESS: POINT GET", async () => {
        await request(app)
        .patch("/dashboard")
        .send({ userID, pointCount })
        .expect(201)
        .expect({ data })
    });

    test("FAIL: POINT GET", async () => {
        await request(app)
        .patch("/dashboard")
        .send({ userID, pointCount })
        .expect(400)
        .expect({ message: "USER MATCH MISS" })
    })
})