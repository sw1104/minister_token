const adminDashboardDao = require("../models/adminDashboardDao");
const Error = require("../middlewares/errorConstructor")

const getFullToken = async ( grade ) => {
    if(grade === "1"){
        return await adminDashboardDao.getFullToken()
    } throw new Error("GRADE ERROR", 400)
}

const getRemainToken = async ( grade ) => {
    if(grade === 1){
        return await adminDashboardDao.getRemainToken()
    } throw new Error("GRADE ERROR", 400)
}

const getIssuedToken = async ( grade ) => {
    if(grade === 1){
        return await adminDashboardDao.getIssuedToken()
    } throw new Error("GRADE ERROR", 400)
}

const getMembers = async ( grade ) => {
    if(grade === 1){
        return await adminDashboardDao.getMembers()
    } throw new Error("GRADE ERROR", 400)
}

const getPersonalToken = async ( grade ) => {
    if(grade === 1){
        return await adminDashboardDao.getPersonalToken()
    } throw new Error("GRADE ERROR", 400)
}

const getNewIssuedToken = async ( grade ) => {
    if(grade === 1){
        return await adminDashboardDao.getNewIssuedToken()
    } throw new Error("GRADE ERROR", 400)
}

module.exports = { 
    getFullToken,
    getRemainToken,
    getIssuedToken,
    getMembers,
    getPersonalToken,
    getNewIssuedToken
}