const userDashboardDao = require("../models/userDashboardDao")
const errorHandler = require("../middlewares/errorHandler")


const getPoint = async ( userId ) => {
    if(userId !== 1){
        return await userDashboardDao.getPoint( userId )
    } throw new Error("NOT NORMAL USER",400)
}

const getGrade = async ( userId ) => {
    if(userId !== 1){
        return await userDashboardDao.getGrade( userId )
    } throw new Error("NOT NORMAL USER",400)
}

const getProducts = async () => {
    return await userDashboardDao.getProducts()
}

const getTokenUseHistory = async ( userId ) => {
    if(userId !== 1){
        return await userDashboardDao.getTokenUseHistory( userId )
    } throw new Error("NOT NORMAL USER",400)
}

const createWallet = async ( userId ) => {
    const duplicateWallet = await userDashboardDao.duplicateWallet( userId )

    if(duplicateWallet === 1) 

    await userDashboardDao.createWallet( userId )

    return await userDashboardDao.getAllToken( userId )
}

const earnPoint = async ( userId ) => {
    return await userDashboardDao.earnPoint( userId )
}

const buyProduct = async ( userId, productId ) => {
    const allToken = await userDashboardDao.getAllToken( userId )
    const priceProduct = await userDashboardDao.priceProduct( productId )

    if(Object.values(allToken[0])[0] < Object.values(priceProduct[0])[0]) throw new Error("TOKEN ",400)

    await userDashboardDao.buyProduct( userId, productId )
    await userDashboardDao.getRemainToken(userId, productId)
    const getCumulative = await userDashboardDao.getCumulativeToken( userId )
    const cumulative = Object.values(getCumulative[0])[0]

    let gradeId
    if(cumulative < 1000){
        gradeId = 2
    } else if(cumulative >= 1000 && cumulative < 2000){
        gradeId = 3
    } else if(cumulative >= 2000 && cumulative < 3000){
        gradeId = 4
    } else if( cumulative >= 3000){
        gradeId = 5
    }

    return await userDashboardDao.gradeUp( userId, gradeId )
}

const exchangeReq = async ( userId ) => {
    const getPoint = await userDashboardDao.getPoint(userId)
    
    const point = Object.values(getPoint[0])[1]

    if(point < 1000) throw new Error("NOT NORMAL USER",400)

    return await userDashboardDao.exchangeReq( userId )
}
module.exports = {
    getPoint,
    getGrade,
    getProducts,
    getTokenUseHistory,
    createWallet,
    earnPoint,
    buyProduct,
    exchangeReq
}