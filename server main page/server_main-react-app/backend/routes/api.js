const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

router.get('/db-status', dbController.checkDbStatus);

module.exports = router;
