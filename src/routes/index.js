const express = require("express");
const router = express.Router();

const userRouter = require("../routes/userRouter");
router.use("/user", userRouter.router);

const adminDashboardRoute = require("./adminDashboardRoute");
router.use("/admin", adminDashboardRoute.router)

const userDashboardRoute = require("./userDashboardRoute");
router.use("/users", userDashboardRoute.router)

const adminRoute = require("./adminRoute")
router.use("/req", adminRoute.router)

module.exports = router;