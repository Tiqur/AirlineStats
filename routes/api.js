const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile('views/api.html', {root: path.join(__dirname, "../") });
});

module.exports = router;
