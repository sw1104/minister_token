const express = require("express");
const userController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler")
const validation = require("../middlewares/auth");
const refresh = require("../middlewares/refresh");

const router = express.Router();

router.post("/signin", errorHandler(userController.signIn));

router.post("/signup", errorHandler(userController.signUp));

router.get("/auth", validation, errorHandler(userController.signIn));

router.post("/refresh", refresh)

module.exports = {
    router
};