const express = require("express")
const router = express.Router();

const adminController = require("../controllers/amdinController");

router.patch("/collect", adminController.tokenCollect);

module.exports = {
    router
}