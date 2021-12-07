const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const { getLawsuitTRF1 } = require('../service/progress');

router.get('/', async (req, res, next) => {
  try {
    const { lawsuit } = req.body;
    const response = await getLawsuitTRF1(lawsuit);
    return res.status(StatusCodes.OK).send(response);
  } catch (err) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).send({
      message: "Court servers are busy, please try again.",
    })
  }
})

module.exports = router;
