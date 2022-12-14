const userDashboardDao = require("../models/userDashboardDao")
const Error = require("../middlewares/errorConstructor")


const getPoint = async (userId) => {
    if (userId !== 1) {
        return await userDashboardDao.getPoint(userId)
    } throw new Error("NOT NORMAL USER", 400)
}

const getAllToken = async (userId) => {
    if (userId !== 1) {
        return await userDashboardDao.getAllToken(userId)
    } throw new Error("NOT NORMAL USER", 400)
}

const getGrade = async (userId) => {
    if (userId !== 1) {
        return await userDashboardDao.getGrade(userId)
    } throw new Error("NOT NORMAL USER", 400)
}

const getProducts = async () => {
    return await userDashboardDao.getProducts()
}

const getTokenUseHistory = async (userId) => {
    if (userId !== 1) {
        return await userDashboardDao.getTokenUseHistory(userId)
    } throw new Error("NOT NORMAL USER", 400)
}

const createWallet = async (userId) => {
    const duplicateWallet = await userDashboardDao.duplicateWallet(userId)

    if (Object.values(duplicateWallet[0])[0] === '1') return await userDashboardDao.getAllToken(userId)

    await userDashboardDao.createWallet(userId);

    return await userDashboardDao.getAllToken(userId);
}

const earnPoint = async (userId) => {
    return await userDashboardDao.earnPoint(userId);
}

const buyProduct = async (userId, productId) => {
    const allToken = await userDashboardDao.getAllToken(userId);
    const priceProduct = await userDashboardDao.priceProduct(productId);

    if (Object.values(allToken[0])[0] < Object.values(priceProduct[0])[0]) throw new Error("TOKEN ", 400)

    await userDashboardDao.buyProduct(userId, productId);
    await userDashboardDao.getRemainToken(userId, productId);
    const getCumulative = await userDashboardDao.getCumulativeToken(userId);
    const cumulative = Object.values(getCumulative[0])[0]

    let gradeId
    if (userId === 24) {
        gradeId = 1
    } else if (cumulative < 1000) {
        gradeId = 2
    } else if (cumulative >= 1000 && cumulative < 2000) {
        gradeId = 3
    } else if (cumulative >= 2000 && cumulative < 3000) {
        gradeId = 4
    } else if (cumulative >= 3000) {
        gradeId = 5
    }

    return await userDashboardDao.gradeUp(userId, gradeId)
}

const exchangeReq = async (userId) => {
    const getPoint = await userDashboardDao.getPoint(userId);
    const getAllToken = await userDashboardDao.getAllToken(userId);
    const allToken = Object.values(getAllToken[0])[0];
    const point = Object.values(getPoint[0])[1]
    const existsUser = await userDashboardDao.existsUserWH(userId);
    const existsState = await userDashboardDao.existsStateWH(userId);

    let user, state;

    if (Object.values(existsUser[0])[0] === '1') {
        user = Object.values(existsUser[0])[0]
        state = Object.values(existsState[0])[0]
    }

    if (point < 1000) throw new Error("LACK OF POINT", 400)
    if (state === 1) throw new Error("ONE TO ONE", 400)

    let dePoint = point - parseInt((point + '').split('').splice(-3).join(''))
    let rePoint = parseInt((point + '').split('').splice(-3).join(''))
    let addToken = (dePoint + '').replace(/0{3}$/g, '') * 1

    await userDashboardDao.initPoint(userId, rePoint)

    if (user === '1') {
        return await userDashboardDao.patchExReq(userId, addToken)
    }
    return await userDashboardDao.exchangeReq(userId, allToken, addToken)
}
module.exports = {
    getPoint,
    getAllToken,
    getGrade,
    getProducts,
    getTokenUseHistory,
    createWallet,
    earnPoint,
    buyProduct,
    exchangeReq
}