const userDao = require("../models/userDao");
const Error = require("../middlewares/errorConstructor")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const eNum = require("../middlewares/eNum");
let point = require("../middlewares/randomPoint");

const signUp = async (email, password) => {
    const checkEmailExist = await userDao.checkEmail(email);
    const checkResult = Number(Object.values(checkEmailExist[0])[0]);

    if (checkResult == eNum.Exists) {
        throw new Error("EMAIL ALREADY EXIST", 400);
    }

    const validationEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!validationEmail.test(email)) {
        throw new Error("EMAIL ERROR", 400);
    }

    const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!validationPassword.test(password)) {
        throw new Error("PASSWORD ERROR", 400);
    }
    let userPoint = point.randomPoint;
    const hashedPassword = await bcrypt.hash(password, eNum.saltRound);
    return await userDao.signUp(email, hashedPassword, userPoint);
}

const signIn = async (email, password) => {
    const userEmail = await userDao.checkEmail(email);
    // const emailResult = JSON.stringify(Object.values(userEmail[0])[0]);
    const emailCheck = emailResult.replace (/\"/gi,'');
    if(emailCheck == false) {
        throw new Error("KEY ERROR", 400);
    }
    const getBcrypt = await userDao.checkPassword(email);
    const decode = await bcrypt.compare(password, getBcrypt[0].password);
    if ( !decode ) {
        throw new Error ("KEY ERROR", 400);
    }

    const grade = await userDao.checkGrade(email);
    const gradeResult = JSON.stringify(Object.values(grade[0])[0]);
    const userGrade = gradeResult.replace (/\"/gi,'');

    if ( userGrade == "admin") {
        let message = "HELLO"
        const payLoadId = await userDao.getUserIdByEmail(email);
        const id = JSON.stringify(Object.values(payLoadId[0])[0]);
        const refreshToken = jwt.sign({ userId : id, exp : Math.floor(Date.now()/1000) + (86400*14) }, process.env.JWT_SECRET);
        const accessToken = jwt.sign({ userId : id, exp: Math.floor(Date.now()/1000) + (3600*1) }, process.env.JWT_SECRET);

        return {
            refreshToken, 
            accessToken,
            message
        }
    } 
    else {
        let message = "WELCOME";
        const payLoadId = await userDao.getUserIdByEmail(email);
        const id = JSON.stringify(Object.values(payLoadId[0])[0]);
        const refreshToken = jwt.sign({ exp : Math.floor(Date.now()/1000) + (86400*14) }, process.env.JWT_SECRET);
        const accessToken = jwt.sign({ userId : id, userGrade : grade_id,   exp: Math.floor(Date.now()/1000) + (60*2) }, process.env.JWT_SECRET);
        await userDao.addToken(email, refreshToken);

        return {
            refreshToken, 
            accessToken,
            message
        }
    }
}

const checkRefresh = async (userId, refreshToken) => {

    const getRefresh = await userDao.getRefresh(userId);
    const refreshInfo = JSON.stringify(Object.values(getRefresh[0])[0])
    const userRefresh = refreshInfo.replace (/\"/gi,'');
    if (refreshToken == userRefresh) {
        const payLoadId = await userDao.getUserIdByUserId(userId);
        const id = JSON.stringify(Object.values(payLoadId[0])[0]);
        const accessToken = jwt.sign({ userId : id, userGrade : grade_id, exp: Math.floor(Date.now()/1000) + (3660*10) }, process.env.JWT_SECRET);

        return accessToken
    } else {
        await userDao.deleteRefresh(userId);
        return false;
    }
}

const updateRefresh = async (userId, newRefreshToken) => {
    await userDao.updateToken(userId, newRefreshToken);
}

module.exports = {
    signIn,
    signUp,
    checkRefresh,
    updateRefresh
}