const dashBoardService = require("../services/dashBoardService");

const getMyTokenInfo = async (req, res) => {
    const userId = info.userId;
    // const userId = req.query;
    const getMyTokenInfo = await dashBoardService.getTokenInfo(userId);
    return res.status(200).json({"Token_Info" : getMyTokenInfo});
}

const getMyOrderInfo = async (req, res) => {
    const {userId} = req.query;
    const getMyOrderInfo = await dashBoardService.getOrderInfo(userId);
    return res.status(200).json({"Order_Info" : getMyOrderInfo});
}

const patchApplyStateApprove = async (req, res) => {
    const applyArray = req.body.array;
    const patchApplyState = await dashBoardService.patchApplyStateApprove(applyArray);
    return res.status(200).json(patchApplyState);
}

const patchApplyStateReject = async (req, res) => {
    const { userId, applyNo } = req.body;
    const patchApplyState = await dashBoardService.patchApplyStateReject(userId, applyNo);
    return res.status(200).json({patchApplyState});
}

module.exports = { 
    getMyTokenInfo,
    getMyOrderInfo,
    patchApplyStateApprove,
    patchApplyStateReject
};