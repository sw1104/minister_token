const request = require("supertest")

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

describe("SIGN UP", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.query(`DELETE FROM users WHERE email="qwert1234@email.com"`);
        await AppDataSource.destroy();
    });

    test("SUCCESS: signup", async () => {
        await request(app)
        .post("/user/signup")
        .send({
            email: "qwert1234@email.com",
            password: "qwert1234"
        })
        .expect(200)
        .expect({
            message: "SIGNUP SUCCESS"
        })
    });

    test("FAIL: signup email exists", async () => {
        await request(app)
        .post("/user/signup")
        .send({
            email: "qwer1234@email.com",
            password: "qwer1234"
        })
        .expect(400)
        .expect(
            { message: 'EMAIL ALREADY EXIST', statusCode: 400 }
        )
    });

    test("FAIL: signup email error", async () => {
        await request(app)
        .post("/user/signup")
        .send({
            email: "qwer123com",
            password: "qwer1234"
        })
        .expect(400)
        .expect(
            { message: 'EMAIL ERROR', statusCode: 400 }
        )
    });
});

describe("SIGN IN", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.query(`DELETE FROM users WHERE email="qwert1234@email.com"`);
        await AppDataSource.destroy();
    });

    test("SUCCESS: user signin", async () => {
        await request(app)
        .post("/user/signin")
        .send({
            email: "user1@test.com",
            password: "qwer1234"
        })
        .expect(200)
    });

    test("SUCCESS: admin signup", async () => {
        await request(app)
        .post("/user/signin")
        .send({
            email: "jaeha@test.com",
            password: "qwer1234"
        })
        .expect(200)
    });

    test("FAIL: signin incorrect email", async () => {
        await request(app)
        .post("/user/signin")
        .send({
            email: "user1@edmail.com",
            password: "qwer1234"
        })
        .expect(400)
        .expect(
            { message: 'KEY ERROR', statusCode: 400 }
        )
    });

    test("FAIL: signup incorrenct password", async () => {
        await request(app)
        .post("/user/signin")
        .send({
            email: "user1@test.com",
            password: "qwerr1234"
        })
        .expect(400)
        .expect(
            { message: 'KEY ERROR', statusCode: 400 }
        )
    });
});