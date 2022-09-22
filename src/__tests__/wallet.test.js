const request = require("supertest");
const { createApp } = require("../../app");
const { database } = require("../models/datasource");

describe("MAKE WALLET", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await database.initialize();
    });

    afterAll(async () => {
        await database.destroy();
    });

    test("WALLET MAKE SUCCESS", async () => {
        await request(app)
        .post("/wallet")
        .set('authorization', process.env.TOKEN)
        .expect(200)
        .expect({ message: "WALLET MAKE SUCCESS" });
    });

    test("WALLET MAKE FAIL", async () => {
        await request(app)
        .post("/wallet")
        .set('authorization', process.env.TOKEN)
        .expect(404)
        .expect({message: "WALLET ALREADY EXIST"});
    });

});