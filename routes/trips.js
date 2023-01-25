var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");
const moment = require("moment");

/* Post consultation d'un voyage. */
router.post("/", function (req, res) {
  const { departure, arrival, date } = req.body;
  if (!departure || !arrival || !date) {
    res.json({
      result: false,
      error: "Veuillez saisir l'un des champs !",
    });
  }

  const startDate = new Date(date).setUTCHours(0, 0, 0);
  const endDate = new Date(date).setUTCHours(23, 59, 59, 59);

  Trip.find({
    departure,
    arrival,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).then((data) => {
    res.json({
      result: true,
      trips: data,
    });
  });
});

module.exports = router;
