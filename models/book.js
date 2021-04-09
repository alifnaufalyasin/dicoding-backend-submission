const Sequelize = require("sequelize")
const db = require("../config/database")

const Book = db.define(
  "book",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING(21),
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    summary: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pageCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    readPage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    finished: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    reading: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    createdAt: "insertedAt",
  }
)

module.exports = Book
