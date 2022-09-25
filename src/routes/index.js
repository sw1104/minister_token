const express = require('express');
const router = express.Router();
const dashBoardRouter = require("./dashBoardRouter");

router.use("/user", dashBoardRouter.router);

module.exports = router;