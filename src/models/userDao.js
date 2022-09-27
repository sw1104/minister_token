const { AppDataSource } = require("./datasource");
const eNum = require("../middlewares/eNum")

const checkEmail = async (email) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS 
        (SELECT * FROM users
        WHERE email = "${email}");
        `
    )
}

const signUp = async (email, hashedPassword, userPoint) => {
    return await AppDataSource.query(
        `
        INSERT INTO users (email, password, point, grade_id)
        VALUES ("${email}", "${hashedPassword}", "${userPoint}", "${eNum.Bronze}" );
        `,
    )
}

const checkPassword = async (email) => {
    return await AppDataSource.query(
        `
        SELECT password FROM users
        where email = "${email}";
        `
    )
}

const checkGrade = async(email) => {
    return await AppDataSource.query(
        `
        SELECT g.grade FROM grades g
        LEFT JOIN users u ON u.grade_id = g.id
        where u.email = "${email}";
        `
    )
}

const addToken = async(email, refreshToken) => {
    return await AppDataSource.query(
        `
        UPDATE users SET refresh = "${refreshToken}" WHERE email = "${email}"
        `
    )
}

const getUserIdByEmail = async(email) => {
    return await AppDataSource.query(
        `
        SELECT id FROM users WHERE email = "${email}";
        `
    )
}

const getUserIdByUserId = async(userId) => {
    return await AppDataSource.query(
        `
        SELECT id FROM users WHERE id = "${userId}";
        `
    )
}

const getRefresh = async(userId) => {
    return AppDataSource.query(
        `
        SELECT refresh FROM users WHERE id = "${userId}";
        `
    )
}

const deleteRefresh = async (userId) => {
    return AppDataSource.query(
        `
        UPDATE users SET refresh = " " WHERE id = "${userId}"
        `
    )
}

const updateToken = async(userId, newRefreshToken) => {
    return await AppDataSource.query(
        `
        UPDATE users SET refresh = "${newRefreshToken}" WHERE id = "${userId}"
        `
    )
}

module.exports = {
    checkEmail,
    signUp,
    checkPassword,
    checkGrade,
    addToken,
    getUserIdByEmail,
    getRefresh,
    getUserIdByUserId,
    deleteRefresh,
    updateToken
}