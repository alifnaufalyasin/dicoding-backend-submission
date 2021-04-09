const Sequelize = require("sequelize")
require("dotenv").config()
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string()
        }
        return next()
      },
    },
    // for writing to database
    timezone: "+07:00",
  }
)

module.exports = db
