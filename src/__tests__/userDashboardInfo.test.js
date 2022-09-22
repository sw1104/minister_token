const request = require("supertest");

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

describe("USER DASHBOARD INFORMATION", () => {
    let app;

    beforAll(async () => {
        app = createApp;
        await AppDataSource.initialized();
    })

    afterAll(async () => {
        await AppDataSource.destroy();
    })
    
    test("SUCCESS: DASHBOARD INFO", async () => {
        await request(app)
        .get("/dashboard")
        .send({ userEmail, password })
        .expect(200)
        .expect({ data })
    });

    test("FAIL: DASHBOARD INFO", async () => {
        await request(app)
        .get("/dashboard")
        .send({ userEmail, password })
        .expect(400)
        .expect({ message: "USER MATCH MISS" })
    })
})