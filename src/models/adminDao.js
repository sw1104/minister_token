const { AppDataSource } = require("./datasource");

const acceptExchange = async ( userId, addToken, dePoint ) => {
    return await AppDataSource.query(
        `
        UPDATE wallets w 
        INNER JOIN users u 
        ON u.id = w.user_id
        SET 
            w.all_token = w.all_token + ${addToken},
            w.add_token = ${addToken},
            u.point = u.point - ${dePoint}
        WHERE w.user_id = ${userId}
        `
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

module.exports = {
    acceptExchange,
    tokenCollect
}