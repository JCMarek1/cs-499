// app_server/routes/trips.js
const express = require('express');
const router = express.Router();

router.get('/gale-reef', (req, res) => {
  res.render('trips/gale-reef', { 
    title: 'Gale Reef Adventure',
    layout: 'layout'
  });
});

router.get('/dawsons-reef', (req, res) => {
  res.render('trips/dawsons-reef', {
    title: 'Dawson’s Reef Exploration',
    layout: 'layout'
  });
});

router.get('/claires-reef', (req, res) => {
  res.render('trips/claires-reef', {
    title: 'Claire’s Reef Discovery',
    layout: 'layout'
  });
});

router.get('/himalayan-trek', (req, res) => {
  res.render('trips/himalayan-trek', {
    title: 'Himalayan Trek',
    layout: 'layout'
  });
});

router.get('/romantic-rome', (req, res) => {
  res.render('trips/romantic-rome', {
    title: 'Romantic Rome',
    layout: 'layout'
  });
});

router.get('/new-york-city-escape', (req, res) => {
  res.render('trips/new-york-city-escape', {
    title: 'New York City Escape',
    layout: 'layout'
  });
});

router.get('/great-wall-adventure', (req, res) => {
  res.render('trips/great-wall-adventure', {
    title: 'Great Wall Adventure',
    layout: 'layout'
  });
});

router.get('/tokyo-lights', (req, res) => {
  res.render('trips/tokyo-lights', {
    title: 'Tokyo Lights',
    layout: 'layout'
  });
});

router.get('/sydney-sunsets', (req, res) => {
  res.render('trips/sydney-sunsets', {
    title: 'Sydney Sunsets',
    layout: 'layout'
  });
});

router.get('/paris-getaway', (req, res) => {
  res.render('trips/paris-getaway', {
    title: 'Paris Getaway',
    layout: 'layout'
  });
});

router.get('/pyramids-and-pharaohs', (req, res) => {
  res.render('trips/pyramids-and-pharaohs', {
    title: 'Pyramids and Pharaohs',
    layout: 'layout'
  });
});

router.get('/santorini-shores', (req, res) => {
  res.render('trips/santorini-shores', {
    title: 'Santorini Shores',
    layout: 'layout'
  });
});

router.get('/alpine-retreat', (req, res) => {
  res.render('trips/alpine-retreat', {
    title: 'Alpine Retreat',
    layout: 'layout'
  });
});

router.get('/banff-explorer', (req, res) => {
  res.render('trips/banff-explorer', {
    title: 'Banff Explorer',
    layout: 'layout'
  });
});

router.get('/cancun-fiesta', (req, res) => {
  res.render('trips/cancun-fiesta', {
    title: 'Cancun Fiesta',
    layout: 'layout'
  });
});

router.get('/golden-triangle-tour', (req, res) => {
  res.render('trips/golden-triangle-tour', {
    title: 'Golden Triangle Tour',
    layout: 'layout'
  });
});

router.get('/northern-lights-quest', (req, res) => {
  res.render('trips/northern-lights-quest', {
    title: 'Northern Lights Quest',
    layout: 'layout'
  });
});

router.get('/kruger-safari', (req, res) => {
  res.render('trips/kruger-safari', {
    title: 'Kruger Safari',
    layout: 'layout'
  });
});

router.get('/machu-picchu-hike', (req, res) => {
  res.render('trips/machu-picchu-hike', {
    title: 'Machu Picchu Hike',
    layout: 'layout'
  });
});

router.get('/rio-carnival-special', (req, res) => {
  res.render('trips/rio-carnival-special', {
    title: 'Rio Carnival Special',
    layout: 'layout'
  });
});

router.get('/london-history-tour', (req, res) => {
  res.render('trips/london-history-tour', {
    title: 'London History Tour',
    layout: 'layout'
  });
});

router.get('/new-zealand-adventure', (req, res) => {
  res.render('trips/new-zealand-adventure', {
    title: 'New Zealand Adventure',
    layout: 'layout'
  });
});

router.get('/bangkok-and-beaches', (req, res) => {
  res.render('trips/bangkok-and-beaches', {
    title: 'Bangkok and Beaches',
    layout: 'layout'
  });
});

router.get('/istanbul-magic', (req, res) => {
  res.render('trips/istanbul-magic', {
    title: 'Istanbul Magic',
    layout: 'layout'
  });
});

router.get('/fjords-and-glaciers', (req, res) => {
  res.render('trips/fjords-and-glaciers', {
    title: 'Fjords and Glaciers',
    layout: 'layout'
  });
});

router.get('/sahara-desert-nights', (req, res) => {
  res.render('trips/sahara-desert-nights', {
    title: 'Sahara Desert Nights',
    layout: 'layout'
  });
});

router.get('/havana-rhythms', (req, res) => {
  res.render('trips/havana-rhythms', {
    title: 'Havana Rhythms',
    layout: 'layout'
  });
});

router.get('/dubrovnik-discovery', (req, res) => {
  res.render('trips/dubrovnik-discovery', {
    title: 'Dubrovnik Discovery',
    layout: 'layout'
  });
  
});
router.get('/', (req, res) => {
  res.render('travel', {
    title: 'Travel Packages',
    layout: 'layout',
    trips
  });
});

module.exports = router;
