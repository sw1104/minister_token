const { verify } = require('../utils/jwt-utils');
const jwt = require("jsonwebtoken");

const validation = async (req, res, next) => {

    if (req.header("accessToken")) {
        const token = req.header("accessToken"); 
        const result = verify(token); 
        info = jwt.decode(token);
        if (result.ok && info.userGrade == 1) { 
          next();
        } else { 
          res.status(401).json({
            ok: false,
            message: result.message, 
          });
        }
      }
      }

module.exports = validation;