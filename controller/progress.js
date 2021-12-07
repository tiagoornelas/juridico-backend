const router = require('express').Router();
const { getLawsuitTRF1 } = require('../service/progress');

router.get('/', async (req, res, next) => {
  const { lawsuit } = req.body;
  const response = await getLawsuitTRF1(lawsuit);
  return res.status(200).send(response);
})

module.exports = router;
