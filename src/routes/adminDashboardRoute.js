const express = require("express");
const router = express.Router();

const validationAdmin = require("../middlewares/authAdmin");

const adminDashboard = require("../controllers/adminDashboardController");

router.get("/full", validationAdmin, adminDashboard.getFullToken);
router.get("/remain", validationAdmin, adminDashboard.getRemainToken);
router.get("/issued", validationAdmin, adminDashboard.getIssuedToken);
router.get("/members", validationAdmin, adminDashboard.getMembers);
router.get("/personal", validationAdmin, adminDashboard.getPersonalToken);
router.get("/newissued", validationAdmin, adminDashboard.getNewIssuedToken);
router.get("/dashboard", validationAdmin, adminDashboard.getUserTokenInfo);
router.get("/exchange", validationAdmin, adminDashboard.getUserExchangeInfo);
router.patch("/token/approve", validationAdmin, adminDashboard.patchApplyStateApprove);
router.patch("/token/reject", validationAdmin, adminDashboard.patchApplyStateReject);

module.exports = {
    router
}