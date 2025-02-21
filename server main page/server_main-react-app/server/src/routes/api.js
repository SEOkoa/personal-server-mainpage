const express = require('express');
const router = express.Router();
const { connect } = require('../db/database');

router.get('/data', async (req, res) => {
    try {
        const connection = await connect();
        const rows = await connection.query('SELECT * FROM your_table');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch data', error);
        res.status(500).send('Failed to fetch data');
    }
});

module.exports = router;
