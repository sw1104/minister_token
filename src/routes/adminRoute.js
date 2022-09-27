const express = require("express")
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler")
const validation = require("../middlewares/auth");

const adminController = require("../controllers/amdinController")

router.patch("/exchange", validation, errorHandler(adminController.acceptExchange))
router.patch("/collect", validation, errorHandler(adminController.tokenCollect))

module.exports = {
    router
}