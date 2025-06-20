const mongoose = require('mongoose');
const Trip = require('../models/travlr');  
const Model = mongoose.model('trips');


// Get: trips - lists all the tips
// Regarless of outcome, responce must inculde HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    try {
        const q = await Model
            .find({}) 
            .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

        if(!q || q.length === 0) {  
            return res
                    .status(404)
                    .json({ message: "No trips found" });      
        } else { 
            return res
                    .status(200)
                    .json(q);    
        }
    } catch (err) {
        return res
                .status(500)
                .json({ error: "Server error" });  
    }
};

// Get: trips - lists a single trip
// Regarless of outcome, responce must inculde HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    try {
        const q = await Model
            .findOne({'code' : req.params.tripCode}) 
            .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

        if(!q) { 
            return res
                    .status(404)
                    .json({ message: "Trip not found" });      
        } else { 
            return res
                    .status(200)
                    .json(q);    
        }
    } catch (err) {
        return res
                .status(500)
                .json({ error: "Server error" });  
    }
};

const tripsAddTrip = async (req, res) => {
    getUser(req, res,
      (req, res) => {
        Trip.create(
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          },
          (err, trip) => {
            if (err) {
              return res
                .status(400)  // bad request
                .json(err);
            } else {
              return res
                .status(201)  // created
                .json(trip);
            }
          }
        );
      }
    );
  }

// PUT: /trips/:tripCode - Update existing trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
      (req, res) => {
        Trip.findOneAndUpdate(
          { 'code': req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          },
          { new: true }
        )
        .then(trip => {
          if (!trip) {
            return res
              .status(404)
              .send({
                message: "Trip not found with code " + req.params.tripCode
              });
          }
          res.send(trip);
        })
        .catch(err => {
          if (err.kind === 'ObjectId') {
            return res
              .status(404)
              .send({
                message: "Trip not found with code " + req.params.tripCode
              });
          }
          return res
            .status(500)  // server error
            .json(err);
        });
      }
    );
  }

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};