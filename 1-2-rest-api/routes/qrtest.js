const express = require('express')
const api = express.Router()

api.get('/', (req, res) => {
    let testsend = {
             "applinks": {
               "apps": [],
               "details": [
                 {
                   "appID": "Z83T53XK53.com.sketch-wallet.ios",
                   "paths": [ "/sketchwallet/*" ]
                 }
               ]
             }
  }
  res.setHeader('Content-Type', 'application/json'); 
  res.send(testsend)
})

api.get('/an', (req, res) => {
  return;
})

module.exports = api