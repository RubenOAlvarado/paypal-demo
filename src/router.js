const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', (req, res) => res.send({Message: 'Hello world'}));

router.post('/createorder', controller.setTransaction);
router.post('/createauth', controller.setAuth);
router.post('/capturetrx', controller.captureTransaction);
router.post('/captureAuth', controller.createAuth);

module.exports = router;