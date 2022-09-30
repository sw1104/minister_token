const express = require("express");
const dashBoardController = require("../controllers/dashBoardController");
const validation = require("../middlewares/auth");
const router = express.Router();

router.get("/dashboard", validation, dashBoardController.getMyTokenInfo)

router.get("/order", dashBoardController.getMyOrderInfo)

router.patch( "/token/approve", dashBoardController.patchApplyStateApprove)

router.patch("/token/rejects", dashBoardController.patchApplyStateReject)

module.exports = { router };
