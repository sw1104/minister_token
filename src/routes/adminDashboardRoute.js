const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler")

const adminValidation = require("../middlewares/authAdmin");
const validationAdmin = require("../middlewares/authAdmin");

const adminDashboard = require("../controllers/adminDashboardController")

router.get("/full", validationAdmin, errorHandler(adminDashboard.getFullToken))
router.get("/remain", validationAdmin, errorHandler(adminDashboard.getRemainToken))
router.get("/issued", validationAdmin, errorHandler(adminDashboard.getIssuedToken))
router.get("/members", validationAdmin, errorHandler(adminDashboard.getMembers))
router.get("/personal", validationAdmin, errorHandler(adminDashboard.getPersonalToken))
router.get("/newissued", validationAdmin, errorHandler(adminDashboard.getNewIssuedToken))
// router.get("/test", adminDashboard.getDashboard)
// router.get("/test", adminDashboard.getDashboard)
router.get("/dashboard", validationAdmin, errorHandler(adminDashboard.getUserTokenInfo))
router.get("/exchange", validationAdmin, errorHandler(adminDashboard.getUserExchangeInfo))
router.patch("/token/approve", validationAdmin, errorHandler(adminDashboard.patchApplyStateApprove))
router.patch("/token/reject", validationAdmin, errorHandler(adminDashboard.patchApplyStateReject))

module.exports = {
    router
}