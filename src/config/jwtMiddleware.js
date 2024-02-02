const jwt = require("jsonwebtoken");
const secret_config = require("./secret");
const { response, errResponse } = require("./response");
const baseResponse = require("./responseStatus");

const jwtMiddleware = (req, res, next) => {
  // read the token from header or url
  // const token = req.headers["x-access-token"] || req.query.token;
  const token = req.headers["api_key"] || req.query.token;
  console.log("token:", token);

  // token does not exist
  if (token == undefined) {
    return res.send(errResponse(baseResponse.TOKEN_EMPTY));
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secret_config, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    console.error("JWT Verification Error:", error);

    return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  };
  // process the promise
  p.then((verifiedToken) => {
    //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
    req.verifiedToken = verifiedToken;
    next();
  }).catch(onError);
};

module.exports = jwtMiddleware;
