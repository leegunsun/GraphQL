const express = require('express');
const router = express.Router();
const axios = require('axios');

const targetUrl = 'http://www.tqrtqr.shop/.well-known/apple-app-site-association';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching the URL:', error);
    res.status(500).send('Error fetching the URL');
  }
});

module.exports = router;
