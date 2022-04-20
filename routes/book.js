const {
  searchBook,
  editBook,
  deleteBook,
  getABook,
  createABook,
  getAllBooksByPopularity,
} = require("../handlers/book");
const { isLoggedIn } = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").get(getAllBooksByPopularity).post(createABook);

router.get("/search", searchBook);
router
  .route("/:bookid")
  .get(isLoggedIn, getABook)
  .put(editBook)
  .delete(deleteBook);
module.exports = router;
