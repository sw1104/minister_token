const { AppDataSource } = require("../models/datasource");

const getTokenInfo = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT
            u.email,
            g.grade,
            wh.id,
            wh.all_token,
            wh.add_token,
            DATE_FORMAT(wh.created_at, '%Y-%c-%e') AS date
        FROM wallet_histories wh
        LEFT JOIN users u ON wh.user_id = u.id
        LEFT JOIN grades g ON u.grade_id = g.id
        WHERE wh.state_id = 1
        
        `
    )
}

const getExchangeInfo = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT 
        u.email,
		wh.add_token,
        s.state,
        DATE_FORMAT(wh.updated_at, '%Y-%c-%e') AS date
        FROM users u
        LEFT JOIN wallet_histories wh ON u.id = wh.user_id
        LEFT JOIN states s ON wh.state_id = s.id
        WHERE wh.state_id > 1
        ORDER BY wh.updated_at desc LIMIT 6
        `
    )
}

const patchStateApprove = async (applyNo) => {
    return await AppDataSource.query(
        `
        UPDAte wallet_histories wh SET state_id = 2 WHERE wh.id = ${applyNo}
        `
    )
}

const patchStateReject = async (applyNo) => {
    return await AppDataSource.query(
        `
        UPDAte wallet_histories wh SET state_id = 3 WHERE wh.id = ${applyNo}
        `
    )
}

module.exports = {
    getTokenInfo,
    getExchangeInfo,
    patchStateApprove,
    patchStateReject
};