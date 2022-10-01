const express = require("express");
const router = express.Router();
const userRouter = require("../routes/userRouter");
const adminDashboardRoute = require("./adminDashboardRoute");
const userDashboardRoute = require("./userDashboardRoute");
const adminRoute = require("./adminRoute")

router.use("/user", userRouter.router);

router.use("/admin", adminDashboardRoute.router)

router.use("/users", userDashboardRoute.router)

router.use("/req", adminRoute.router)

module.exports = router;