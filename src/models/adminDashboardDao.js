const { AppDataSource } = require("./datasource")

// const getDashboard = async ( grade ) => {
//     const result = await AppDataSource.query(
//         `
//         SELECT 
//             full_token as fullToken
//         FROM master_wallets;

//         SELECT
//             mw.full_token - sum(w.all_token) as remainToken
//         FROM master_wallets mw 
//         INNER JOIN wallets w GROUP BY mw.full_token;

//         SELECT
//             sum(all_token) as issuedToken
//         FROM wallets;

//         SELECT
//             count(*) - 1 as members
//         FROM users;

//         SELECT
//         JSON_ARRAYAGG(
//             JSON_OBJECT(
//         user_id,
//         all_token
//         )) AS personalToken
//         FROM wallets;

//         SELECT 
//         JSON_ARRAYAGG(
//             JSON_OBJECT(
//         user_id,
//         all_token
//         )) AS newIssuedToken
//         FROM wallets
//         ORDER BY updated_at desc;
//         `
//     )
//     return result
// }

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
            user_id, 
            all_token
        FROM wallets
        `
    )
}

const getNewIssuedToken = async () => {
    return await AppDataSource.query(
        `
        SELECT 
            user_id, 
            add_token 
        FROM wallets 
        ORDER BY updated_at desc
        `
    )
}

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
    console.log(applyNo);
    return await AppDataSource.query(
        `
        UPDAte wallet_histories wh SET state_id = 3 WHERE wh.id = ${applyNo}
        `
    )
}

module.exports = {
    // getDashboard
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
