const express = require("express")
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler")

const validationUser = require("../middlewares/authUser")
const adminController = require("../controllers/amdinController")

router.patch("/exchange", validationUser, errorHandler(adminController.acceptExchange))
router.patch("/collect", errorHandler(adminController.tokenCollect))

module.exports = {
    router
}