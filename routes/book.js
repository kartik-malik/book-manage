const {
  searchBook,
  editBook,
  deleteBook,
  getABook,
  createABook,
  getAllBooksByPopularity,
} = require("../handlers/book");
const {
  isLoggedIn,
  isAdmin,
  ensureCorrectUser,
} = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").get(getAllBooksByPopularity).post(isLoggedIn, createABook);

router.get("/search", searchBook);
router
  .route("/:bookid")
  .get(isLoggedIn, getABook)
  .put(ensureCorrectUser, editBook)
  .delete(ensureCorrectUser, deleteBook);
module.exports = router;
