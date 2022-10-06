const request = require("supertest")

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/datasource")

const EXPIRED_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOSIsInVzZXJHcmFkZSI6IjEiLCJleHAiOjE2NjUwMzcwNzQsImlhdCI6MTY2NTAzMzQ3NH0.ldnpitAEA6tnKDJfopgiKdjcrfgW3xH5F044wBUZziY"
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOSIsInVzZXJHcmFkZSI6IjEiLCJleHAiOjE2NjUwNDExMzIsImlhdCI6MTY2NTAzNzUzMn0._RRvzMWfyeRIrYykfUQBlEKcNsb8mvJL-vTID6LQz4Y"
const MALFORMED_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOSIsInVzZXJHcmFkZSI6IjEiLCJleHAiOjE2NjUwMzcwNzQsImlhdCI6MTY2NTAzMzQ3NH0.ldnpitAEA6tnKDJfopgiKdjcrfgWBUZziY"

describe("GET ADMIN DASHBOARD INFO", () => {
    let app;
    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    test("SUCCESS: get full token info", async () => {
        await request(app)
        .get("/admin/full")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            [{"fullToken": 100000000}]
        )
    });

    test("SUCCESS: get remain token info", async () => {
        await request(app)
        .get("/admin/remain")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            [{"remainToken": '99999041'}]
        )
    });

    test("SUCCESS: get issued info", async () => {
        await request(app)
        .get("/admin/issued")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            [{"allToken": '959'}]
        )
    });

    test("SUCCESS: get member info", async () => {
        await request(app)
        .get("/admin/members")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            [{"member": '3'}]
        )
    });

    test("SUCCESS: get personal info", async () => {
        await request(app)
        .get("/admin/personal")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            {"personal": [
                {
                    "user_id": 24,
                    "email": "master@email.com",
                    "all_token": 0
                },
                {
                    "user_id": 27,
                    "email": "test@email.com",
                    "all_token": 187
                },
                {
                    "user_id": 28,
                    "email": "user1@test.com",
                    "all_token": 772
                }
            ]}
        )
    });

    test("SUCCESS: get newissued info", async () => {
        await request(app)
        .get("/admin/newissued")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            {
                "newIssued": [
                    {
                        "email": "test@email.com",
                        "add_token": 1
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 36
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 40
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 1
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 1
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 1
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 2
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 1
                    },
                    {
                        "email": "user1@test.com",
                        "add_token": 850
                    },
                    {
                        "email": "user1@test.com",
                        "add_token": 22
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    },
                    {
                        "email": "test@email.com",
                        "add_token": 54
                    }
            ]}
        )
    });

    test("SUCCESS: get dashboard info", async () => {
    await request(app)
    .get("/admin/dashboard")
    .set("accessToken", ACCESS_TOKEN)
    .expect(200)
    .expect(
        {"Token_Info": 
            [{
                "email": "test@email.com",
                "userId": 27,
                "grade": "bronze",
                "id": 52,
                "all_token": 187,
                "add_token": 1,
                "date": "2022-10-4"
            }]}
        )
    });

    test("SUCCESS: get exchange info", async () => {
        await request(app)
        .get("/admin/exchange")
        .set("accessToken", ACCESS_TOKEN)
        .expect(200)
        .expect(
            {"Order_Info": [
                {
                    "email": "user1@test.com",
                    "userId": 28,
                    "add_token": 10,
                    "state": "Reject",
                    "date": "2022-10-4"
                }
            ]}
        )
    });

    test("FAIL: token expired", async () => {
        await request(app)
        .get("/admin/full")
        .set("accessToken", EXPIRED_ACCESS_TOKEN)
        .expect(401)
        .expect(
            {
                "ok": false,
                "message": "jwt expired"
            }
        )
    });

    test("FAIL: token malformed", async () => {
        await request(app)
        .get("/admin/full")
        .set("accessToken", MALFORMED_ACCESS_TOKEN)
        .expect(401)
        .expect(
            {
                "ok": false,
                "message": "invalid signature"
            }
        )
    });
});

// describe("PATCH approve & reject", () => {
//     let app;
//     beforeAll(async () => {
//         app = createApp();
//         await AppDataSource.initialize();
//         await AppDataSource.query(
//             `
//             INSERT INTO 
//             `
//         )
//     });

//     afterAll(async () => {
//         await AppDataSource.destroy();
//     });

//         // test("SUCCESS: patch approve", async () => {
//     //     await request(app)
//     //     .patch("/admin/token/approve")
//     //     .set("accessToken", ACCESS_TOKEN)
//     //     .set({"array": ['1']})
//     //     .set({"userIdArray": ['1']})
//     //     .expect(200)
//     // });

//     // test("SUCCESS: patch reject", async () => {
//     //     await request(app)
//     //     .patch("/admin/token/reject")
//     //     .set("accessToken", ACCESS_TOKEN)
//     //     .set({"array": ['1']})
//     //     .set({"userIdArray": ['1']})
//     //     .expect(200)
//     // });
// });