const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  copies: {
    type: Number,
    default: 1,
  },
  issued: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  description: {
    type: mongoose.Schema.Types.String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  imageUrl: {
    type: String,
    default:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fjustpublishingadvice.com%2Fwp-content%2Fuploads%2F2017%2F02%2FHow-to-use-URL-links.png&imgrefurl=https%3A%2F%2Fjustpublishingadvice.com%2Fself-publishing-mistakes-bad-url-links%2F&tbnid=P4zG0eGiY2F6nM&vet=12ahUKEwj6pJCy2KL3AhVsz6ACHc6EABwQMygDegUIARCtAQ..i&docid=WUY70C0tVRkboM&w=750&h=350&q=book%20image%20url&client=ubuntu&ved=2ahUKEwj6pJCy2KL3AhVsz6ACHc6EABwQMygDegUIARCtAQ",
  },
});
const books = mongoose.model("book", bookSchema);
module.exports = books;
