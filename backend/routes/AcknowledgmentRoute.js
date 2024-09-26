const express = require('express');
const { createAcknowledgment } = require('../controllers/AcknowledgmentController');
const router = express.Router();

router.post('/', createAcknowledgment);

module.exports = router;
