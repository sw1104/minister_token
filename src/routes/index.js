const express = require("express");
const router = express.Router();
const dashBoardRouter = require("./dashBoardRouter");
const userRouter = require("../routes/userRouter");

router.use("/admin", dashBoardRouter.router);

router.use("/user", userRouter.router);

module.exports = router;