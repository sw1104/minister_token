const { sign, verify, refreshVerify } = require("../utils/jwt-utils");
const userService = require("../services/userService")
const jwt = require('jsonwebtoken');

const refresh = async (req, res) => {

  if (req.headers["accesstoken"] && req.headers["refreshtoken"]) {
    const accessToken = req.headers["accesstoken"];
    const refreshToken = req.headers["refreshtoken"];
    const accessDecoded = jwt.decode(accessToken);
    const refreshDecoded = jwt.decode(refreshToken);
    const authResult = verify(accessToken);

    if (accessDecoded === null) {
      return res.status(401).json({
        ok: false,
        message: 'No authorized1!',
      });
    }

      const userId = accessDecoded.userId;
      const refreshResult = await refreshVerify(refreshToken, userId);
    if (accessDecoded.exp < (Date.now()/1000 - 60) || authResult.ok === false || authResult.message === 'jwt expired') {
      if (refreshResult === false) {
        res.status(401).send({
          ok: false,
          message: 'SESSION OVER!',
        });
      } else { 
        if( refreshDecoded.exp < (Date.now()/1000 - 60)) {
          const newRefreshToken = refresh ();
          const newAccessToken = sign (userId);
          await userService.updateToken(userId, newAccessToken);
        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
        }
        const newAccessToken = sign (userId);
        
        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      res.status(400).json({
        ok: false,
        message: 'Access token is not expired!',
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
};

module.exports = refresh;