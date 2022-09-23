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

module.exports = {
    // getDashboard
    getFullToken,
    getRemainToken,
    getIssuedToken,
    getMembers,
    getPersonalToken,
    getNewIssuedToken
}
