module.exports = (req, res, next) => {
  // add code for middleware
  res.sendResponse = ({data, status="success", tambahan, code = 201}) => {
    if (tambahan){
      return res.status(code).send({
        status: status,
        ...tambahan,
        data: data,
      })
    }else{
      return res.status(code).send({
        status: status,
        data: data,
      })
    }
  }

  res.sendError = (
    message = "Catatan gagal ditambahkan",
    status = "error",
    code = 400
  ) => {
    return res.status(code).send({
      status: status,
      message: message,
    })
  }

  req.customError = (message, status) => {
    let err = new Error(message)
    err.status = status
    return err
  }

  return next() // use next to go next router
}
