const { AppDataSource } = require("../models/datasource");

const getTokenInfo = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT
            u.email,
            g.grade,
            w.all_token,
            w.add_token,
            DATE_FORMAT(w.created_at, '%Y-%c-%e') AS date
        FROM wallets w 
        LEFT JOIN users u ON u.id = w.user_id
        LEFT JOIN grades g ON u.grade_id = g.id
        WHERE w.add_token > 0
        
        `
    )
}

const getOrderInfo = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT 
        p.name,
        p.price,
        u.email,
        w.use_token,
        w.remain_token,
        DATE_FORMAT(w.created_at, '%Y-%c-%e') AS date
        FROM users u
        LEFT JOIN wallets w ON u.id = w.user_id
        LEFT JOIN orders o ON o.user_id = w.user_id
        LEFT JOIN products p ON p.id = o.product_id
        WHERE w.use_token > 0
        ORDER BY w.created_at desc LIMIT 6
        `
    )
}

const patchStateApprove = async (applyNo) => {
    console.log("Dao", applyNo)
    return await AppDataSource.query(
        `
        들어가야할 내용
        1. 지갑의 신청 상태 변경 waiting > approve
        `
    )
}

const patchStateReject = async (userId, applyNo) => {
    return await AppDataSource.query(
        `
        들어가야할 내용
        1. 지갑의 신청 상태 변경 waiting > reject
        `
    )
}

module.exports = {
    getTokenInfo,
    getOrderInfo,
    patchStateApprove,
    patchStateReject
};