const express = require("express");
const dashBoardController = require("../controllers/dashBoardController");
const router = express.Router();

router.get("/dashboard", dashBoardController.getMyTokenInfo)

router.get("/order", dashBoardController.getMyOrderInfo)

module.exports = { router };
