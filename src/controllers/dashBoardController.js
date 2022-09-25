const dashBoardService = require("../services/dashBoardService");

const getMyTokenInfo = async (req, res) => {
    const {userId} = req.query;
    const getMyTokenInfo = await dashBoardService.getTokenInfo(userId);
    res.status(200).json({"Token_Info" : getMyTokenInfo});
}

const getMyOrderInfo = async (req, res) => {
    const {userId} = req.query;
    const getMyOrderInfo = await dashBoardService.getOrderInfo(userId);
    res.status(200).json({"Order_Info" : getMyOrderInfo});
}

module.exports = { 
    getMyTokenInfo,
    getMyOrderInfo
};