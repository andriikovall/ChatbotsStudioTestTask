const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(id);
});


module.exports = router;
