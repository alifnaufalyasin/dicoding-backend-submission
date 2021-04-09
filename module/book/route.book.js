const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const bookController = require("./contoller.book")
const bookSchema = require("./schema.book")



router
  .route("/books")
  .post(
    validateBody(bookSchema.simpanBuku),
    bookController.tambahBook,
  )

router
  .route("/books")
  .get(
    bookController.getBook
  )

router
  .route("/books/:bookId")
  .get(
    bookController.detailBook
  )

router
  .route("/books/:bookId")
  .put(
    validateBody(bookSchema.updateBuku),
    bookController.updateBook
  )

router
  .route("/books/:bookId")
  .delete(
    bookController.deleteBook
  )
module.exports = router
