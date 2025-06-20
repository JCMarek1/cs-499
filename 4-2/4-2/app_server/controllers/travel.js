// controllers/travel.js

const fetch = require('node-fetch'); // Make sure you have node-fetch installed

/* GET travel view */
const travel = async (req, res) => {
    const tripsEndpoint = 'http://localhost:3000/api/trips';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(tripsEndpoint, options);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format: Expected an array of trips');
        }

        if (data.length === 0) {
            throw new Error('No trips found in the database');
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: data
        });

    } catch (err) {
        console.error('Travel controller error:', err);

        res.status(500).render('error', {
            title: 'Error',
            error: err.message
        });
    }
};

module.exports = { travel };
