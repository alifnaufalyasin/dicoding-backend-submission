// const Joi = require("joi")

const validateBody = (schema) => {
  return async (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false })
    // console.log("result")
    // console.log(result.error.details)
    if (result.error) {
      let errorData = []
      // console.log(result.error, "asd")
      // bawah ini bisa return langsung errorData
      if (result.error.message) errorData[0] = result.error.message
      else{
        result.error.details.map((item) => {
          let error = {
            path: item.path[0],
            message: item.message,
          }
          errorData.push(error)
        })
      }
      // return response(res,false,errorData,,422)
      res.sendError( errorData[0],"fail", 400)
    } else {
      next()
    }
  }
}

module.exports = {
  validateBody,
}
