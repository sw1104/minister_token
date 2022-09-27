const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler")
const validation = require("../middlewares/auth")

const adminDashboard = require("../controllers/adminDashboardController")

router.get("/full", validation, errorHandler(adminDashboard.getFullToken))
router.get("/remain", validation, errorHandler(adminDashboard.getRemainToken))
router.get("/issued", validation, errorHandler(adminDashboard.getIssuedToken))
router.get("/members", validation, errorHandler(adminDashboard.getMembers))
router.get("/personal", validation, errorHandler(adminDashboard.getPersonalToken))
router.get("/newissued", validation, errorHandler(adminDashboard.getNewIssuedToken))
// router.get("/test", adminDashboard.getDashboard)
// router.get("/test", adminDashboard.getDashboard)

module.exports = {
    router
}