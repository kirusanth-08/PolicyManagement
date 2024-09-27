const express = require('express');
const { createAcknowledgment, getAcknowledgments } = require('../controllers/AcknowledgmentController');
const { get } = require('mongoose');
const router = express.Router();

router.get('/', getAcknowledgments);
router.post('/', createAcknowledgment);


module.exports = router;