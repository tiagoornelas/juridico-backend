const router = require('express').Router();
const acessarProcesso = require('../service/andamentos');

router.get('/', async (req, res, next) => {
  const { processo } = req.body;
  const response = await acessarProcesso(processo);
  return res.status(200).send(response);
})

module.exports = router;
