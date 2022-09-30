const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler")

const validationAdmin = require("../middlewares/authAdmin");
const validationUser = require("../middlewares/authUser");

const userDashboard = require("../controllers/userDashboardController");

router.get("/point", validationUser, errorHandler(userDashboard.getPoint))
router.get("/token", validationUser, errorHandler(userDashboard.getAllToken))
router.get("/grade", validationUser, errorHandler(userDashboard.getGrade))
router.get("/product", errorHandler(userDashboard.getProducts))
router.get("/history", validationUser, errorHandler(userDashboard.getTokenUseHistory))
router.post("/wallet", validationUser, errorHandler(userDashboard.createWallet))
router.get("/earnpoint", validationUser, errorHandler(userDashboard.earnPoint))
router.post("/order", validationUser, errorHandler(userDashboard.buyProduct))
router.post("/exchange", validationUser, errorHandler(userDashboard.exchangeReq))

module.exports = {
    router
}

