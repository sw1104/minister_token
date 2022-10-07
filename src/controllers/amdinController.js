const adminService = require("../services/adminService")
const Error = require("../middlewares/errorHandler")

const acceptExchange = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await adminService.acceptExchange(userId)
    res.status(201).json({ message: "SSS" })
}

const tokenCollect = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await adminService.tokenCollect(userId)
    res.status(201).json({ message: "TOKEN COLLECT" })
}

module.exports = {
    acceptExchange,
    tokenCollect
}