const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Serve static assets if available (e.g., React build)
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all handler: for any request that doesn't match the above, send back the React index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});