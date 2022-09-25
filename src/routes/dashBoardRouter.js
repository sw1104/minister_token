const express = require("express");
const dashBoardController = require("../controllers/dashBoardController");
const validation = require("../middlewares/auth");
const router = express.Router();

router.get("/dashboard", validation, dashBoardController.getMyTokenInfo)

router.get("/exchange", validation, dashBoardController.getUserExchangeInfo)

router.patch("/token/approve", validation, dashBoardController.patchApplyStateApprove)

router.patch("/token/reject", validation, dashBoardController.patchApplyStateReject)

module.exports = { router };
