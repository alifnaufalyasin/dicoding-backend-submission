const Book = require("../../models/book")
const { nanoid } = require("nanoid")
const { Op } = require("sequelize");

async function tambahBook(req, res) {
  let payload = req.body
  let book = await Book.findOne({
    where: { name: payload.name }
  })
  // if (book) return res.sendError("Buku sudah pernah ditambahkan", 400)
  if (payload.pageCount === payload.readPage) payload.finished = true
  else payload.finished = false
  payload.id = nanoid()
  book = new Book(payload)
  await book.save()
  return res.sendResponse({data:{bookId: book.id},  tambahan:{message: "Buku berhasil ditambahkan"}})
}

async function getBook(req, res) {
  let book = await Book.findAll({
    attributes: ['id','name','publisher'],
  })
  if (req.query){
    let {reading, finished, name} = req.query
    if (reading) book = await Book.findAll({
      where: { reading: reading==1 },
      attributes: ['id','name','publisher'],
    })
    if (finished) book = await Book.findAll({
      where: { finished: finished==1 },
      attributes: ['id','name','publisher'],
    })
    if (name) book = await Book.findAll({
      where: { name: {
        [Op.regexp]: name
      } },
      attributes: ['id','name','publisher'],
    })
  }
  if (!book) return res.sendError("Book sudah pernah ditambahkan")
  return res.sendResponse({data: {books:book},code:200})
}

async function detailBook(req, res) {
  const { bookId } = req.params
  let book = await Book.findOne({
    where: { id:bookId },
    // attributes: ['id','name','publisher'],
  })
  if (!book) return res.sendError("Buku tidak ditemukan","fail",404)
  return res.sendResponse({data: {book:book},code:200})
}

async function updateBook(req, res) {
  const { bookId } = req.params
  const payload = req.body
  let book = await Book.findOne({
    where: { id:bookId },
    // attributes: ['id','name','publisher'],
  })
  if (!book) return res.sendError("Gagal memperbarui buku. Id tidak ditemukan","fail",404)
  for (const key in payload) {
    book[key] = payload[key]
  }
  await book.save()
  return res.sendResponse({status: "success", tambahan:{message: "Buku berhasil diperbarui"} ,code:200})
}

async function deleteBook(req, res) {
  const { bookId } = req.params
  let book = await Book.findOne({
    where: { id:bookId },
  })
  if (!book) return res.sendError("Buku gagal dihapus. Id tidak ditemukan","fail",404)
  await book.destroy()
  return res.sendResponse({status: "success", tambahan:{message: "Buku berhasil dihapus"} ,code:200})
}


module.exports = {
  tambahBook,
  getBook,
  detailBook,
  updateBook,
  deleteBook
}