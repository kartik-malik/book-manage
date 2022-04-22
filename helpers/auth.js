const jwt = require("jsonwebtoken");
exports.verifyJwtHelper = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
      if (decoded) {
        resolve(decoded);
      } else {
        reject({
          status: 401,
          message: "Unauthorized",
        });
      }
    });
  });
};
