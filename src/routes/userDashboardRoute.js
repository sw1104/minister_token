const express = require("express");
const router = express.Router();

const validationAdmin = require("../middlewares/authAdmin");
const validationUser = require("../middlewares/authUser");

const userDashboard = require("../controllers/userDashboardController");

router.get("/point", validationUser, userDashboard.getPoint)
router.get("/token", validationUser, userDashboard.getAllToken)
router.get("/grade", validationUser, userDashboard.getGrade)
router.get("/product", userDashboard.getProducts)
router.get("/history", validationUser, userDashboard.getTokenUseHistory)
router.post("/wallet", validationUser, userDashboard.createWallet)
router.get("/earnpoint", validationUser, userDashboard.earnPoint)
router.post("/order", validationUser, userDashboard.buyProduct)
router.post("/exchange", validationUser, userDashboard.exchangeReq)

module.exports = {
    router
}

