const express = require("express");
const router = express.Router();

const validationAdmin = require("../middlewares/authAdmin");
const validationUser = require("../middlewares/authUser");
const userDashboard = require("../controllers/userDashboardController");
const userController = require("../controllers/userController");
const refresh = require("../middlewares/refresh");

router.get("/point", validationUser, userDashboard.getPoint);
router.get("/token", validationUser, userDashboard.getAllToken);
router.get("/grade", validationUser, userDashboard.getGrade);
router.get("/product", userDashboard.getProducts);
router.get("/history", validationUser, userDashboard.getTokenUseHistory);
router.post("/wallet", validationUser, userDashboard.createWallet);
router.get("/earnpoint", validationUser, userDashboard.earnPoint);
router.post("/order", validationUser, userDashboard.buyProduct);
router.post("/exchange", validationUser, userDashboard.exchangeReq);
router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.get("/auth", validationUser);
router.post("/refresh", refresh);
router.get("/adminAuth", validationAdmin);

module.exports = {
    router
}

