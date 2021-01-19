const express = require('express');
const router = express.Router();
const path = require('path');
const { validateBody } = require('../middleware/validateBody');


router.get('/', (req, res) => {
  res.sendFile('views/api.html', {root: path.join(__dirname, "../") });
});


router.get('/flights', validateBody, (req, res) => {

  console.log(req.body)
  res.sendStatus(200)
});

module.exports = router;
