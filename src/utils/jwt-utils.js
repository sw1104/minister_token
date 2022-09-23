const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const userDao = require("../models/userDao");


module.exports = {
    sign (userId) {
    const payload = {
        userId: userId,
    };

    return jwt.sign(payload, secret, { 
      algorithm: 'HS256',
      expiresIn: '120s', 	  
    });
  },
  verify(accessToken) { 
    let decoded = null;
    try {
      decoded = jwt.verify(accessToken, secret);
      return {
        ok: true,
        userId: decoded.id,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh(){
    return jwt.sign({}, secret, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });
  },
  async refreshVerify (refreshToken, userId) {
    
    try {
      const getRefresh = await userDao.getRefresh(userId);
      const dataResult = JSON.stringify(Object.values(getRefresh[0])[0]);
      const data = dataResult.replace (/\"/gi,'');
      
      if (refreshToken === data) {
        try {
          jwt.verify(refreshToken, secret);
          return true;
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};

