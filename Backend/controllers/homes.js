const connectToDb = require('../config/db');

exports.addHome = async (req, res) => {
    const { title, description, price } = req.body;
    const db = await connectToDb();

    if (!title || !description || !price) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'All fields are required' }));
    }

    try {
        await db.collection('homes').insertOne({ title, description, price });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Home added successfully' }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error adding home' }));
    }
};

exports.listHomes = async (req, res) => {
    const db = await connectToDb();
    try {
        const homes = await db.collection('homes').find().toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(homes));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error fetching homes' }));
    }
};
