const dashBoardDao = require("../models/dashBoardDao");

const getTokenInfo = async (userId) => {
    const getInfo = await dashBoardDao.getTokenInfo(userId);
    return getInfo
}

const getExchangeInfo = async (userId) => {
    const getInfo = await dashBoardDao.getExchangeInfo(userId);
    return getInfo
}

const patchApplyStateApprove = async (applyArray) => {
    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        await dashBoardDao.patchStateApprove(applyNo);
    }
    return true;
}

const patchApplyStateReject = async (applyArray) => {
    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        await dashBoardDao.patchStateReject(applyNo);
    }
    return true;
}

module.exports = {
    getTokenInfo,
    getExchangeInfo,
    patchApplyStateApprove,
    patchApplyStateReject
}

