const express = require("express");
const userController = require("../controllers/userController");
const validationUser = require("../middlewares/authUser");
const validationAdmin = require("../middlewares/authAdmin");
const refresh = require("../middlewares/refresh");

const router = express.Router();

router.post("/signin", userController.signIn)

router.post("/signup", userController.signUp)

router.get("/auth", validationUser);

router.post("/refresh", refresh)

router.get("/adminAuth", validationAdmin);

module.exports = {
    router
};