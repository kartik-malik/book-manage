const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.signIn = async function (req, res, next) {
  try {
    let user = await User.findOne({
      username: req.body.username,
    });
    let { id, username } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid UserName/Password",
      });
    }
  } catch (error) {
    console.trace(error);
    error.message = "Something went wrong";
    return next(error);
  }
};
exports.signUp = async function (req, res, next) {
  const { username, password } = req.body;

  try {
    let user = await User.create({ username, password });
    let token = jwt.sign(
      {
        id: user._id,
        user: user.username,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({ user, token });
  } catch (error) {
    if (error.code == 11000) {
      error.message = "Username already exists";
    }
    next(error);
  }
};
