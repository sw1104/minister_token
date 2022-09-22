const request = require("supertest")

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

describe("ADMIN DASHBOARD INFORMATION", () => {
    let app;

    beforeAll(async()=>{
        app = createApp();
        await AppDataSource.initialize();
    })

    afterAll(async()=>{
        await AppDataSource.destroy();
    })

    test("SUCCESS: DASHBOARD INFO", async () => {
        await request(app)
        .get("/dashboard")
        .send({ AdminUserEmail })
        .expect(200)
        .expect({ data })
    });

    test("FAIL: DASHBOARD INFO", async () => {
        await request(app)
        .get("/dashboard")
        .send({ NotAdminEmail })
        .expect(400)
        .expect({ message : "ADMIN USER MATCH MISS" })
    })
});