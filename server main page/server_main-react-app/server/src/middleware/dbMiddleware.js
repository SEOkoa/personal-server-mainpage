const { connect } = require('../db/database');

async function dbMiddleware(req, res, next) {
    try {
        req.db = await connect();
        next();
    } catch (error) {
        console.error('Failed to connect to the database', error);
        res.status(500).send('Database connection error');
    }
}

module.exports = dbMiddleware;
