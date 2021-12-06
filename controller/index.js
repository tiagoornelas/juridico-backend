const router = require('express').Router();

router.get('/', async (req, res, next) => {
  console.log(req.body);
})

module.exports = router;
