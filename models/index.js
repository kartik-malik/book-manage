const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://kartik:${process.env.MONGO_PASS}@cluster0.e0tsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    keepAlive: true,

    useNewUrlParser: true,
  }
);
module.exports.User = require("./user");
module.exports.Books = require("./book");
module.exports.BookIssued = require("./booksIsuued");
