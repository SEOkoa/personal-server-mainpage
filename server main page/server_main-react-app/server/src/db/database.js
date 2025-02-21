const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST || "localhost",
    user: process.env.MARIADB_USER || "root",
    password: process.env.MARIADB_PASSWORD || "",
    database: process.env.MARIADB_DATABASE || "mydatabase",
    connectionLimit: process.env.MARIADB_CONNECTION_LIMIT || 5,
});

async function connect() {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to MariaDB");
        return connection;
    } catch (error) {
        console.error("Failed to connect to MariaDB", error);
        throw error;
    }
}

module.exports = { connect };