const express = require('express')
const api = express.Router()

api.get('/', (req, res) => {

  res.status(200)
  res.send({messgae : 'health check'})
})

module.exports = api