const { Books, BookIssued } = require("../models");
const books = require("../models/book");

exports.getAllBooksByPopularity = async function (req, res, next) {
  try {
    const data = await books.find({}).sort({ clicks: -1 }).exec();
    res.json({ books: data });
  } catch (error) {
    next(error);
  }
};
exports.createABook = async function (req, res, next) {
  const {
    title,
    price,
    author,
    userId,
    year,
    description,
    imageUrl = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fjustpublishingadvice.com%2Fwp-content%2Fuploads%2F2017%2F02%2FHow-to-use-URL-links.png&imgrefurl=https%3A%2F%2Fjustpublishingadvice.com%2Fself-publishing-mistakes-bad-url-links%2F&tbnid=P4zG0eGiY2F6nM&vet=12ahUKEwj6pJCy2KL3AhVsz6ACHc6EABwQMygDegUIARCtAQ..i&docid=WUY70C0tVRkboM&w=750&h=350&q=book%20image%20url&client=ubuntu&ved=2ahUKEwj6pJCy2KL3AhVsz6ACHc6EABwQMygDegUIARCtAQ",
    copies,
  } = req.body;
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
    const book = await books
      .findByIdAndUpdate(id, { $inc: { clicks: 1 } }, { new: true })
      .populate("userId")
      .exec();
    return res.json({ book, copiesLeft: book.copies - book.issued });
  } catch (error) {
    console.log(error);
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
  const bookId = req.params.bookid;

  const { title, price, author, userId, year, description, imageUrl, copies } =
    req.body;
  try {
    const book = await books.findOne({
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
    return res.json({ book: updatedBook });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async function (req, res, next) {
  const bookId = req.params.bookid;
  const { userId } = req.body;
  try {
    const book = await books.findOne({
      _id: bookId,
    });
    if (!book) {
      return next({
        status: 400,
        message: "Invalid Parameters",
      });
    }
    console.log(book);
    let updatedBook = await books.findOneAndDelete({ _id: bookId });
    return res.send(updatedBook);
  } catch (err) {
    console.trace(err);
    next(err);
  }
};
exports.issueBook = async (req, res, next) => {
  const bookId = req.params.bookid;
  const userId = req.body.userId;
  try {
    const book = await books.findOne({ _id: bookId });
    if (!book) {
      return next({
        status: 400,
        message: "Invalid Parameters",
      });
    }
    if (book.copies - book.issued <= 0) {
      return next({
        status: 400,
        message: "Sorry all books issued",
      });
    }
    const bookAlreadyIssued = await BookIssued.exists({
      book: bookId,
      user: userId,
    });
    if (bookAlreadyIssued) {
      return next({
        status: 400,
        message: "Sorry book already issued by you",
      });
    }
    const issuedBook = await BookIssued.create({
      book: bookId,
      user: userId,
    });
    book.issued = book.issued + 1;
    await book.save();
    return res.json({ success: true, message: "Issue succesfully", book });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
