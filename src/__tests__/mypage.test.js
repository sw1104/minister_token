const request = require("supertest");
const { createApp } = require("../../app");
const { database } = require("../models/datasource");

describe("MYPAGE", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await database.initialize();
    });

    afterAll(async () => {
        await database.destroy();
    });

    test("SUCCESS LOADING MYPAGE WALLET HISTORY", async () => {
        await request(app)
        .get("/mypage/wallet")
        .set('authorization', process.env.TOKEN)
        .expect(200)
        .expect({ mywallet : [
            {
                email : "test@email.com",
                grade : "Gold",
                all_token: 100,
                use_token : 10,
                collect_token : 0,
                remain_token : 90,
                updated_at : "2022-09-10"
            }
        ] });
    });

    test("SUCCESS LOADING MYPAGE ORDER HISTORY", async () => {
        await request(app)
        .get("/mypage/order")
        .set('authorization', process.env.TOKEN)
        .expect(200)
        .expect({ order : [
            {
                name : "test product name",
                price : 10000,
                updated_at : 2022-09-12
            }
        ] });
    });

    test("FAIL LOADING MYPAGE WALLET HISTORY", async () => {
        await request(app)
        .post("/mypage/wallet")
        .set('authorization', process.env.TOKEN)
        .expect(404)
        .expect({message: "WALLET NOT EXIST"});
    });

    test("FAIL LOADING MYPAGE ORDER HISTORY", async () => {
        await request(app)
        .post("/mypage/order")
        .set('authorization', process.env.TOKEN)
        .expect(404)
        .expect({message: "ORDER NOT EXIST"});
    });


});