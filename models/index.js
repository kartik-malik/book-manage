const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/newkroop", {
  keepAlive: true,

  useNewUrlParser: true,
});
module.exports.User = require("./user");
module.exports.Books = require("./book");
module.exports.BookIssued = require("./booksIsuued");
