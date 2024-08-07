const express = require('express')
const api = express.Router()

api.get('/ios', (req, res) => {
    return {
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
})

api.get('/an', (req, res) => {

})