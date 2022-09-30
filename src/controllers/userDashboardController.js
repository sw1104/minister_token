const userDashboardService = require("../services/userDashboardService");
const Error = require("../middlewares/errorHandler");

const getPoint = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await userDashboardService.getPoint(userId);
    res.status(200).json(data)
}

const getAllToken = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await userDashboardService.getAllToken(userId);
    res.status(200).json(data)
}

const getGrade = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400);

    const data = await userDashboardService.getGrade(userId);
    res.status(200).json(data)
}

const getProducts = async (req, res) => {
    const data = await userDashboardService.getProducts();
    res.status(200).json(data)
}

const getTokenUseHistory = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400);

    const data = await userDashboardService.getTokenUseHistory(userId);
    res.status(200).json(data)
}

const createWallet = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await userDashboardService.createWallet(userId);
    res.status(201).json({ data, message: "CREATE WALLET" })
}

const earnPoint = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await userDashboardService.earnPoint(userId);
    res.status(201).json(data)
}

const buyProduct = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await userDashboardService.buyProduct(userId, productId);
    res.status(201).json({ message: "PURCHASE COMPLETE" })
}

const exchangeReq = async (req, res) => {
    const { userId } = req.body;

    if (!userId) throw new Error("KEY ERROR", 400)

    const data = await userDashboardService.exchangeReq(userId);
    res.status(201).json({ message: "REQUEST TO TOKEN EXCHANGE BY POINT" })
}

module.exports = {
    getPoint,
    getAllToken,
    getGrade,
    getProducts,
    getTokenUseHistory,
    createWallet,
    earnPoint,
    buyProduct,
    exchangeReq
}