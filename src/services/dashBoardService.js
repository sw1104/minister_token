const dashBoardDao = require("../models/dashBoardDao");

const getTokenInfo = async (userId) => {
    const getInfo = await dashBoardDao.getTokenInfo(userId);
    return getInfo
}

const getOrderInfo = async (userId) => {
    const getInfo = await dashBoardDao.getOrderInfo(userId);
    return getInfo
}

const patchApplyStateApprove = async (applyArray) => {
    console.log(applyArray);
    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        console.log("inner for", applyNo);
        const patchState = await dashBoardDao.patchStateApprove(applyNo);
    }
    return patchState
}

const patchApplyStateReject = async (userId, applyNo) => {
    const patchState = await dashBoardDao.patchStateReject(userId, applyNo);
    return patchState
}

module.exports = {
    getTokenInfo,
    getOrderInfo,
    patchApplyStateApprove,
    patchApplyStateReject
}

