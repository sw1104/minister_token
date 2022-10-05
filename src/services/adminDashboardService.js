const adminDashboardDao = require("../models/adminDashboardDao");
const adminDao = require("../models/adminDao")
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

const patchApplyStateApprove = async ( applyArray, userId ) => {
    const getExchangeInfo = await adminDao.infoExchange( userId )
    const allToken = Object.values(getExchangeInfo[0])[1]
    const addToken = Object.values(getExchangeInfo[0])[2]

    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        await adminDashboardDao.patchStateApprove(applyNo);
        const stateId = 2;

        await adminDao.acceptExchangeH( userId, allToken, addToken, stateId )
        await adminDao.acceptExchangeWH( userId, stateId)
    

        await adminDao.acceptExchange( userId, addToken)
    }
    return true;
}

const patchApplyStateReject = async ( applyArray, userId ) => {
    const getExchangeInfo = await adminDao.infoExchange( userId )
    const allToken = Object.values(getExchangeInfo[0])[1]
    const addToken = Object.values(getExchangeInfo[0])[2]
    let rePoint = addToken * 1000
    
    for(let i = 0; i < applyArray.length; i++) {
        const applyNo = applyArray[i];
        
        const stateId = 3

        await adminDao.rejectExchange(userId, rePoint)
        await adminDao.rejectExchangeH( userId, allToken, addToken, stateId )
        await adminDashboardDao.patchStateReject( applyNo );
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