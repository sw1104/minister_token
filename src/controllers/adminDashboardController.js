const adminDashboardService = require("../services/adminDashboardService")
const Error = require("../middlewares/errorConstructor")

const getFullToken = async (req, res) => {
    const { userGrade } = req.body;
    if (!userGrade) throw new err("KEY ERROR", 400)
    const data = await adminDashboardService.getFullToken(userGrade);
    res.status(200).json(data)
}
const getRemainToken = async (req, res) => {
    const { userGrade } = req.body;
    if (!userGrade) throw new Error("KEY ERROR", 400)
    const data = await adminDashboardService.getRemainToken(userGrade);
    res.status(200).json(data)
}
const getIssuedToken = async (req, res) => {
    const { userGrade } = req.body;
    if (!userGrade) throw new Error("KEY ERROR", 400)
    const data = await adminDashboardService.getIssuedToken(userGrade);
    res.status(200).json(data)
}
const getMembers = async (req, res) => {
    const { userGrade } = req.body;
    if (!userGrade) throw new Error("KEY ERROR", 400)
    const data = await adminDashboardService.getMembers(userGrade);
    res.status(200).json(data)
}
const getPersonalToken = async (req, res) => {
    const { userGrade } = req.body;
    if (!userGrade) throw new Error("KEY ERROR", 400)
    const data = await adminDashboardService.getPersonalToken(userGrade);
    res.status(200).json({ personal: data })
}
const getNewIssuedToken = async (req, res) => {
    const { userGrade } = req.body;
    if (!userGrade) throw new Error("KEY ERROR", 400)
    const data = await adminDashboardService.getNewIssuedToken(userGrade);
    res.status(200).json({ newIssued: data })
}

// const get = async (req, res) => {
//     const { grade } = req.body;
//     if( !grade ) throw err
//     const data = await dashboardService.getDashboard( grade );
//     res.status(200).json( data )
// }
// const getFullToken = async (req, res) => {
//     const { grade } = req.body;
//     if( !grade ) throw err
//     const data = await dashboardService.getDashboard( grade );
//     res.status(200).json( data )
// }

const getUserTokenInfo = async (req, res) => {
    // const userId = info.userId;
    const getUserTokenInfo = await adminDashboardService.getTokenInfo();
    return res.status(200).json({"Token_Info" : getUserTokenInfo});
}

const getUserExchangeInfo = async (req, res) => {
    // const userId = info.userId;
    const getUserExchangeInfo = await adminDashboardService.getExchangeInfo();
    return res.status(200).json({"Order_Info" : getUserExchangeInfo});
}

const patchApplyStateApprove = async (req, res) => {
    const applyArray = req.body.array;
    if (applyArray.length !== 0) {
        const patchApplyState = await adminDashboardService.patchApplyStateApprove(applyArray);
        return res.status(200).json(patchApplyState);
    } else {
        return res.status(400).json({"message" : "INVAILD_DATA_INPUT"});
    }
}

const patchApplyStateReject = async (req, res) => {
    const applyArray = req.body.array;
    console.log(applyArray);
    if (applyArray !== undefined) {
        const patchApplyState = await adminDashboardService.patchApplyStateReject(applyArray);
        return res.status(200).json(patchApplyState);
    } else if (applyArray === undefined) {
        return res.status(400).json({"message" : "INVAILD_DATA_INPUT"});
    }
}

module.exports = {
    getFullToken,
    getRemainToken,
    getIssuedToken,
    getMembers,
    getPersonalToken,
    getNewIssuedToken,
    getUserTokenInfo,
    getUserExchangeInfo,
    patchApplyStateApprove,
    patchApplyStateReject
}