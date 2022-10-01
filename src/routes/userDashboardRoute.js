const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler")
const validation = require("../middlewares/authUser");

const userDashboard = require("../controllers/userDashboardController");

router.get("/point", validation, errorHandler(userDashboard.getPoint))
router.get("/grade", validation, errorHandler(userDashboard.getGrade))
router.get("/product", errorHandler(userDashboard.getProducts))
router.get("/history", validation, errorHandler(userDashboard.getTokenUseHistory))
router.post("/wallet", validation, errorHandler(userDashboard.createWallet))
router.patch("/point", validation, errorHandler(userDashboard.earnPoint))
router.post("/order", validation, errorHandler(userDashboard.buyProduct))
router.post("/exchange", validation, errorHandler(userDashboard.exchangeReq))

module.exports = {
    router
}

