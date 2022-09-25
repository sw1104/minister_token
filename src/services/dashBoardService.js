const dashBoardDao = require("../models/dashBoardDao");

const getTokenInfo = async (userId) => {
    const getInfo = await dashBoardDao.getTokenInfo(userId);
    return getInfo
}

const getOrderInfo = async (userId) => {
    const getInfo = await dashBoardDao.getOrderInfo(userId);
    return getInfo
}

module.exports = {
    getTokenInfo,
    getOrderInfo
}

