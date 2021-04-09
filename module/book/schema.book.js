const Joi = require("joi")

const simpanBuku = Joi.object({
  name: Joi.string().required().error(new Error("Gagal menambahkan buku. Mohon isi nama buku")),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().max(Joi.ref('pageCount')).message("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount").required(),
  reading: Joi.boolean().required()
})

const updateBuku = Joi.object({
  name: Joi.string().required().error(new Error("Gagal memperbarui buku. Mohon isi nama buku")),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().max(Joi.ref('pageCount')).message("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount").required(),
  reading: Joi.boolean().required()
})

module.exports = {
  simpanBuku,
  updateBuku
}
