const express = require("express");
const router = express.Router();
const dashBoardRouter = require("./dashBoardRouter");

router.use("/admin", dashBoardRouter.router);

const userRouter = require("../routes/userRouter");

router.use("/user", userRouter.router);

module.exports = router;