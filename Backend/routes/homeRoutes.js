const http = require('http');
const { addHome, listHomes } = require('../controllers/homes');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// Utility function to handle request body parsing
const parseBody = (req) => new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        } catch (error) {
            reject(new Error('Invalid JSON format in request body'));
        }
    });
    req.on('error', reject);
});

const router = async (req, res) => {
    try {
        // Handle POST request to add a home
        if (req.method === 'POST' && req.url === '/add-home') {
            req.body = await parseBody(req); // Parse the body of the request
            isAuthenticated(req, res, () => {
                isAdmin(req, res, async () => {
                    await addHome(req, res); // Add home logic
                });
            });

        // Handle GET request to list all homes
        } else if (req.method === 'GET' && req.url === '/get-all-homes') {
            await listHomes(req, res); // Fetch and list all homes

        // Handle invalid routes
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    } catch (error) {
        // Error handling for request processing
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

module.exports = router;
