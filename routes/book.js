const {
  searchBook,
  editBook,
  deleteBook,
  getABook,
  createABook,
  getAllBooksByPopularity,
  issueBook,
} = require("../handlers/book");
const {
  isLoggedIn,
  isAdmin,
  ensureCorrectUser,
} = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(getAllBooksByPopularity)
  .post(isLoggedIn, isAdmin, createABook);

router.get("/search", searchBook);
router
  .route("/:bookid")
  .get(getABook)
  .put(isAdmin, editBook)
  .delete(isAdmin, deleteBook);
router.post("/issue/:bookid", isLoggedIn, issueBook);
module.exports = router;
