const { AppDataSource } = require("./datasource");

const infoExchange = async ( userId ) => {
    return await AppDataSource.query(
        `
        SELECT
            wh.user_id,
            wh.all_token,
            wh.add_token
        FROM wallet_histories wh
        WHERE wh.user_id = ${userId}
        `
    )
}

const acceptExchange = async ( userId, addToken ) => {
    return await AppDataSource.query(
        `
        UPDATE
            wallets w
        SET 
            w.all_token = w.all_token + ${addToken},
            w.add_token = ${addToken}
        WHERE w.user_id = ${userId}
        `
    )
}

const acceptExchangeWH = async ( userId, stateId) => {
    return await AppDataSource.query(
        `
        UPDATE 
            wallet_histories wh
        SET
            state_id = ${stateId}
        WHERE wh.user_id = ${userId}
        `
    )
}

const acceptExchangeH = async ( userId, allToken, addToken, stateId ) => {
    return await AppDataSource.query(
        `
        INSERT INTO histories(
            user_id, all_token, add_token, state_id
        ) VALUES (?, ?, ?, ?)
        `,
        [`${userId}`, `${allToken}`, `${addToken}`, `${stateId}`]
    )
}

const tokenCollect = async ( userId ) => {
    return await AppDataSource.query(
        `
        UPDATE wallets w
        INNER JOIN users u
        ON u.id = w.user_id
        SET
            w.collect_token = w.all_token,
            w.all_token = 0,
            u.point = 0
        WHERE w.user_id = ${userId}
        `
    )
}

const rejectExchange = async ( userId, rePoint ) => {
    return await AppDataSource.query(
        `
        UPDATE
            users
        SET
            point = point + ${rePoint}
        WHERE id = ${userId}
        `
    )
}

const rejectExchangeH = async ( userId, allToken, addToken, stateId ) => {
    return await AppDataSource.query(
        `
        INSERT INTO histories(
            user_id, all_token, add_token, state_id
        ) VALUES (?, ?, ?, ?)
        `,
        [`${userId}`, `${allToken}`, `${addToken}`, `${stateId}`]
    )
}

module.exports = {
    infoExchange,
    acceptExchange,
    acceptExchangeWH,
    acceptExchangeH,
    tokenCollect,
    rejectExchange,
    rejectExchangeH
}