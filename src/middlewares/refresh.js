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
       //access토큰 유효기간이 1분 미만 혹은 검증결과 false인 경우
    if (accessDecoded.exp < (Date.now()/1000 - 60) || authResult.ok === false || authResult.message === 'jwt expired') {
      // refresh토큰 검증결과 false인 경우
      if (refreshResult === false) {
        res.status(401).send({
          ok: false,
          message: 'SESSION OVER!',
        });
      } else { // refresh토큰 false는 아닌경우
        if( refreshDecoded.exp < (Date.now()/1000 - 60)) { // refresh토큰의 유효기간이 1분 미만인 경우
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
    } else { // access토큰 검증결과 true인 경우
      res.status(400).json({
        ok: false,
        message: 'Access token is not expired!',
      });
    }
  } else { // 토큰이 없는 경우
    res.status(400).json({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
};

module.exports = refresh;