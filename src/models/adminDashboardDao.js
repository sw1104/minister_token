const { AppDataSource } = require("./datasource")

const getFullToken = async () => {
    return await AppDataSource.query(
        `
        SELECT 
            full_token AS fullToken
        FROM master_wallets
        `
    )
}

const getRemainToken = async () => {
    return await AppDataSource.query(
        `
        SELECT 
            mw.full_token - sum(w.all_token) AS remainToken
        FROM master_wallets mw 
        INNER JOIN wallets w GROUP BY mw.full_token
        `
    )
}

const getIssuedToken = async () => {
    return await AppDataSource.query(
        `
        SELECT 
            sum(all_token) AS allToken
        FROM wallets
        `
    )
}

const getMembers = async () => {
    return await AppDataSource.query(
        `
        SELECT
            count(*)-1 AS member
        FROM users
        `
    )
}

const days_issued_token = async () => {
    return await AppDataSource.query(

    )
}

const days_remain_token = async () => {
    return await AppDataSource.query(

    )
}

const getPersonalToken = async () => {
    return await AppDataSource.query(
        `
        SELECT 
            w.user_id,
            u.email,
            w.all_token
        FROM wallets w 
        INNER JOIN users u ON u.id = w.user_id
        `
    )
}

const getNewIssuedToken = async () => {
    return await AppDataSource.query(
        `
        SELECT 
            u.email,
            h.add_token
        FROM histories h
        INNER JOIN users u ON u.id = h.user_id
        WHERE h.add_token > 0 AND h.state_id = 2
        ORDER BY h.updated_at DESC LIMIT 24
        `
    )
}

const getTokenInfo = async () => {
    return await AppDataSource.query(
        `
        SELECT
            u.email,
            u.id userId,
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

const getExchangeInfo = async () => {
    return await AppDataSource.query(
        `
        SELECT 
        u.email,
        u.id userId,
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
        UPDATE wallet_histories wh SET state_id = 2 WHERE wh.id = ${applyNo}
        `
    )
}

const patchStateReject = async (applyNo) => {
    return await AppDataSource.query(
        `
        UPDATE wallet_histories wh SET state_id = 3 WHERE wh.id = ${applyNo}
        `
    )
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
    patchStateApprove,
    patchStateReject
}
