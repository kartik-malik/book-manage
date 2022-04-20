const jwt = require("jsonwebtoken");
exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first",
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: "Please log in first",
    });
  }
};
