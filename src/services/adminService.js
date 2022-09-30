const adminDao = require("../models/adminDao")
const userDashboardDao = require("../models/userDashboardDao")

const acceptExchange = async ( userId ) => {
    const getExchangeInfo = await adminDao.infoExchange( userId )
    const allToken = Object.values(getExchangeInfo[0])[1]
    const addToken = Object.values(getExchangeInfo[0])[2]

    let stateId = 2;

    await adminDao.acceptExchangeH( userId, allToken, addToken, stateId )
    await adminDao.acceptExchangeWH( userId, stateId)

    
    return await adminDao.acceptExchange( userId, addToken)
}

const tokenCollect = async ( userId ) => {
    return await adminDao.tokenCollect( userId )
}

module.exports = {
    acceptExchange,
    tokenCollect
}