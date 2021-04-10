const Sequelize = require("sequelize")
// require("dotenv").config()
const db = new Sequelize(
  "dicoding",
  "dicoding",
  "PassDicodingDB",
  {
    host: "aliven.my.id",
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
