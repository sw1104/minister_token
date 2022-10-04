const adminDashboardDao = require("../models/adminDashboardDao");
const Error = require("../middlewares/errorConstructor")

const getFullToken = async ( userGrade ) => {
    if(userGrade === 1){
        return await adminDashboardDao.getFullToken()
    } throw new Error("GRADE ERROR", 400)
}

const getRemainToken = async ( userGrade ) => {
    if(userGrade === 1){
        return await adminDashboardDao.getRemainToken()
    } throw new Error("GRADE ERROR", 400)
}

const getIssuedToken = async ( userGrade ) => {
    if(userGrade === 1){
        return await adminDashboardDao.getIssuedToken()
    } throw new Error("GRADE ERROR", 400)
}

const getMembers = async ( userGrade ) => {
    if(userGrade === 1){
        return await adminDashboardDao.getMembers()
    } throw new Error("GRADE ERROR", 400)
}

const getPersonalToken = async ( userGrade ) => {
    if(userGrade === 1){
        return await adminDashboardDao.getPersonalToken()
    } throw new Error("GRADE ERROR", 400)
}

const getNewIssuedToken = async ( userGrade ) => {
    if(userGrade === 1){
        return await adminDashboardDao.getNewIssuedToken()
    } throw new Error("GRADE ERROR", 400)
}

const getTokenInfo = async () => {
    const getInfo = await adminDashboardDao.getTokenInfo();
    return getInfo
}

const getExchangeInfo = async () => {
    const getInfo = await adminDashboardDao.getExchangeInfo();
    return getInfo
}

const patchApplyStateApprove = async (applyArray) => {
    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        await adminDashboardDao.patchStateApprove(applyNo);
    }
    return true;
}

const patchApplyStateReject = async (applyArray) => {
    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        await adminDashboardDao.patchStateReject(applyNo);
    }
    return true;
}

module.exports = { 
    getFullToken,
    getRemainToken,
    getIssuedToken,
    getMembers,
    getPersonalToken,
    getNewIssuedToken,
    getTokenInfo,
    getExchangeInfo,
    patchApplyStateApprove,
    patchApplyStateReject
}