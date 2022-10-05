const express = require("express")
const router = express.Router();

const validationUser = require("../middlewares/authUser")
const adminController = require("../controllers/amdinController")

router.patch("/exchange", validationUser, adminController.acceptExchange)
router.patch("/collect", adminController.tokenCollect)

module.exports = {
    router
}