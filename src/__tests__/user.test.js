const request = require("supertest");
const { createApp } = require("../../app");
const { database } = require("../models/datasource");

describe("SING UP", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await database.initialize();
    });

    afterAll(async () => {
        await database.destroy();
    });

    test("SIGN UP SUCCESS", async () => {
        await request(app)
        .get("/signup")
        .send({ "email" : "test@email.com", "password" : "test" })
        .expect(200)
        .expect({ message: "SIGN UP SUCCESS" });
    });

    test("SIGN UP FAIL(EMAIL)", async () => {
        await request(app)
        .get("/signup")
        .send({ "email" : "test@email.com", "password" : "test" })
        .expect(404)
        .expect({message: "CHECK EMAIL"});
    });

    test("SIGN UP FAIL(PASSWORD)", async () => {
        await request(app)
        .get("/signup")
        .send({ "email" : "test@email.com", "password" : "test" })
        .expect(404)
        .expect({message: "CHECK PASSWORD"});
    });

    test("SIGN IN SUCCESS", async () => {
        await request(app)
        .get("/signin")
        .send({ "email" : "test@email.com", "password" : "test" })
        .expect(200)
        .expect({ message: "SIGN UP SUCCESS" });
    });

    test("SIGN IN FAIL(EMAIL)", async () => {
        await request(app)
        .get("/signin")
        .send({ "email" : "test@email.com", "password" : "test" })
        .expect(404)
        .expect({message: "CHECK EMAIL"});
    });

    test("SIGN IN FAIL(PASSWORD)", async () => {
        await request(app)
        .get("/signin")
        .send({ "email" : "test@email.com", "password" : "test" })
        .expect(404)
        .expect({message: "CHECK PASSWORD"});
    });
});
