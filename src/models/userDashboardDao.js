const { AppDataSource } = require("./datasource")

const getPoint = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT
            id as userId,
            point
        FROM users
        WHERE id = ${userId}
        `
    )
}

const getGrade = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT
            id userId,
            grade_id gradeId
        FROM users
        WHERE id = ${userId}
        `
    )
}

const getProducts = async () => {
    return await AppDataSource.query(
        `
        SELECT
            id productId,
            name productName,
            price token
        FROM products
        `
    )
}

const getTokenUseHistory = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT 
            o.user_id, 
            o.product_id,
            products.name, 
            products.price, 
            o.updated_at 
        FROM orders o 
        INNER JOIN users u ON u.id = o.user_id 
        INNER JOIN products ON products.id = o.product_id 
        WHERE u.id = ${userId}
        ORDER BY o.updated_at DESC
        `
    )
}

const duplicateWallet = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS(
            SELECT 
                user_id
            FROM wallets 
            WHERE user_id = ${userId}
        )
        `
    )
}

const createWallet = async (userId) => {
    return await AppDataSource.query(
        `
        INSERT INTO wallets (
            user_id, all_token, add_token, use_token, stack_token, collect_token
        ) VALUES (?, 0, 0, 0, 0, 0)
        `, [userId]
    )
}

const getAllToken = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT
            all_token
        FROM wallets
        WHERE user_id = ${userId}
        `
    )
}

const earnPoint = async (userId) => {
    await AppDataSource.query(
        `
        UPDATE users
        SET
            point = point + 10
        WHERE id = ${userId};
        `,
    )
    return await AppDataSource.query(
        `
        SELECT
            point
        FROM users
        WHERE id = ${userId}
        `
    )
}

const priceProduct = async (productId) => {
    return await AppDataSource.query(
        `
        SELECT
            price
        FROM products
        WHERE id = ${productId}
        `
    )
}

const buyProduct = async (userId, productId) => {
    return await AppDataSource.query(
        `
        INSERT INTO orders(
            user_id, product_id
        ) VALUES (?, ?)
        `,
        [userId, productId]
    )
}

const getRemainToken = async (userId, productId) => {
    return await AppDataSource.query(
        `
        UPDATE wallets w 
            INNER JOIN users u
            ON u.id = w.user_id 
            INNER JOIN orders o
            ON o.user_id = u.id
            INNER JOIN products p
            ON p.id = o.product_id
        SET
            w.all_token = w.all_token - p.price,
            w.use_token = p.price,
            w.stack_token = w.use_token + w.stack_token
        WHERE w.user_id = ${userId} AND ${productId} = p.id
        `
    )
}

const getCumulativeToken = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT 
            stack_token
        FROM wallets
        WHERE user_id = ${userId}
        `
    )
}

const gradeUp = async (userId, gradeId) => {
    return await AppDataSource.query(
        `
        UPDATE users
        SET 
            grade_id = ${gradeId}
        WHERE id = ${userId}
        `
    )
}

const getWallet = async (userId) => {
    return await AppDataSource.query(
        `
        SELECT 
            id
        FROM wallets w
        WHERE w.user_id = ${userId}
        `
    )
}
    
const initPoint = async (userId, rePoint) => {
    return await AppDataSource.query(
        `
        UPDATE 
            users
        SET
            point = ${rePoint}
        WHERE id = ${userId}
        `
    )
}

const exchangeReq = async ( userId, allToken, addToken ) => {
    return await AppDataSource.query(
        `
        INSERT INTO wallet_histories(
            user_id, all_token, add_token, use_token, stack_token, collect_token, state_id
        ) VALUES (?,?,?,0,0,0,1)
        `,
        [`${userId}`, `${allToken}`, `${addToken}`]
    )
}

const existsUserWH = async ( userId ) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS(
            SELECT
                user_id
            FROM wallet_histories
            WHERE user_id = ${userId}
        )
        `
    )
}

const existsStateWH = async ( userId ) => {
    return await AppDataSource.query(
        `
        SELECT
            state_id
        FROM wallet_histories w
        WHERE w.user_id = ${userId}
        `
    )
}

const patchExReq = async ( userId, addToken ) => {
    return await AppDataSource.query(
        `
        UPDATE
            wallet_histories AS wh
        INNER JOIN wallets AS w ON wh.user_id = w.user_id 
        SET
            wh.all_token = w.all_token,
            wh.add_token = ${addToken},
            wh.state_id = 1
        WHERE wh.user_id = ${userId}
        `
    )
}

module.exports = {
    getPoint,
    getGrade,
    getProducts,
    getTokenUseHistory,
    duplicateWallet,
    createWallet,
    getAllToken,
    earnPoint,
    priceProduct,
    buyProduct,
    getRemainToken,
    getCumulativeToken,
    gradeUp,
    getWallet,
    initPoint,
    exchangeReq,
    existsUserWH,
    patchExReq,
    existsStateWH
}