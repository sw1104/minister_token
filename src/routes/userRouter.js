const express = require("express");
const userController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler")
const validationUser = require("../middlewares/authUser");
const validationAdmin = require("../middlewares/authAdmin");
const refresh = require("../middlewares/refresh");

const router = express.Router();

router.post("/signin", errorHandler(userController.signIn));

router.post("/signup", errorHandler(userController.signUp));

router.get("/auth", validationUser);

router.post("/refresh", refresh)

router.get("/adminAuth", validationAdmin);

module.exports = {
    router
};