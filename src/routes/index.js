const express = require('express');
const router = express.Router();
const dashBoardRouter = require("./dashBoardRouter");

router.use("/admin", dashBoardRouter.router);

module.exports = router;