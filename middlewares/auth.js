const jwt = require("jsonwebtoken");
const { verifyJwtHelper } = require("../helpers/auth");

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
    console.log(error);
    return next({
      status: 401,
      message: "Please log in first",
    });
  }
};
exports.ensureCorrectUser = function (req, res, next) {
  try {
    const userId = req.body.userId || req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
      if (decoded && decoded.id === userId) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized",
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: error.message,
    });
  }
};
exports.isAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    decoded = await verifyJwtHelper(token);
    const user = await User.findById(decoded.id);
    if (user.isAdmin) {
      next();
    } else {
      next({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    next(error);
  }
};
