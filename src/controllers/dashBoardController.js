const dashBoardService = require("../services/dashBoardService");

const getMyTokenInfo = async (req, res) => {
    const userId = info.userId;
    const getMyTokenInfo = await dashBoardService.getTokenInfo(userId);
    return res.status(200).json({"Token_Info" : getMyTokenInfo});
}

const getUserExchangeInfo = async (req, res) => {
    const getUserExchangeInfo = await dashBoardService.getExchangeInfo(userId);
    return res.status(200).json({"Order_Info" : getUserExchangeInfo});
}

const patchApplyStateApprove = async (req, res) => {
    const applyArray = req.body.array;
    if (applyArray.length !== 0) {
        const patchApplyState = await dashBoardService.patchApplyStateApprove(applyArray);
        return res.status(200).json(patchApplyState);
    } else {
        return res.status(400).json({"message" : "INVAILD_DATA_INPUT"});
    }
}

const patchApplyStateReject = async (req, res) => {
    const applyArray = req.body.array;
    if (applyArray !== undefined) {
        const patchApplyState = await dashBoardService.patchApplyStateReject(applyArray);
        return res.status(200).json(patchApplyState);
    } else if (applyArray === undefined) {
        return res.status(400).json({"message" : "INVAILD_DATA_INPUT"});
    }
}

module.exports = { 
    getMyTokenInfo,
    getUserExchangeInfo,
    patchApplyStateApprove,
    patchApplyStateReject
};