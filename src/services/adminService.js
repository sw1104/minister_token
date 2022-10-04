const adminDao = require("../models/adminDao")
const userDashboardDao = require("../models/userDashboardDao")

const acceptExchange = async ( userId ) => {
    const getPoint = await userDashboardDao.getPoint(userId)
    const point = Object.values(getPoint[0])[1]

    let dePoint = point - parseInt((point+'').split('').splice(-3).join(''))

    let addToken = (dePoint+'').replace(/0{3}$/g,'')*1
    
    return await adminDao.acceptExchange( userId, addToken, dePoint )
}

const tokenCollect = async ( userId ) => {
    return await adminDao.tokenCollect( userId )
}

module.exports = {
    acceptExchange,
    tokenCollect
}