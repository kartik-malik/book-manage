const mongoose = require("mongoose");

const bookIssuedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  },
  {
    timestamps: true,
  }
);
bookIssuedSchema.index({ user: 1, book: 1 }, { unique: true });
const bookIssued = mongoose.model("booksIssued", bookIssuedSchema);
module.exports = bookIssued;
