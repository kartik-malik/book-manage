const { Books } = require("../models");
const books = require("../models/book");

exports.getAllBooksByPopularity = async function (req, res, next) {
  try {
    const data = await books.find({}).sort({ click: -1 }).exec();
    res.json({ books: data });
  } catch (error) {
    next(error);
  }
};
exports.createABook = async function (req, res, next) {
  const { title, price, author, userId, year, description, imageUrl, copies } =
    req.body;
  try {
    const data = await books.create({
      title,
      price,
      author,
      userId,
      year,
      description,
      imageUrl,
      copies,
    });
    return res.json({ books: data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getABook = async function (req, res, next) {
  const id = req.params.bookid;
  try {
    const book = await books.findByIdAndUpdate(
      id,
      { $inc: { clicks: 1 } },
      { new: true }
    );
    return res.json(book);
  } catch (error) {
    next(error);
  }
};

exports.searchBook = async function (req, res, next) {
  const value = req.query.value;
  try {
    const data = await books
      .find({
        $or: [
          { title: value },
          { year: Number.isNaN(value) ? 0 : value },
          { author: value },
        ],
      })
      .sort({ click: -1 })
      .exec();
    res.json({ books: data });
  } catch (error) {
    next(error);
  }
};

exports.editBook = async function (req, res, next) {
  const bookId = req.params.bookId;

  const { title, price, author, userId, year, description, imageUrl, copies } =
    req.body;
  try {
    const book = await books.findOne({
      userId,
      _id: bookId,
    });
    if (!book) {
      next({
        status: 400,
        message: "Invalid Parameters",
      });
    }
    let updatedBook = await books.findOneAndUpdate(
      { _id: bookId },
      {
        $set: {
          title,
          price,
          author,
          year,
          description,
          imageUrl,
          copies,
        },
      },
      {
        new: true,
      }
    );
    return updatedBook;
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async function (req, res, next) {
  const bookId = req.params.bookId;
  const { userId } = req.body;
  try {
    const book = await books.findOne({
      userId,
      _id: bookId,
    });
    if (!book) {
      next({
        status: 400,
        message: "Invalid Parameters",
      });
    }
    let updatedBook = await books.findOneAndDelete({ _id: bookId });
    return updatedBook;
  } catch (err) {
    next(err);
  }
};
