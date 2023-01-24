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

  Trip.find({
    departure,
    arrival,
    date: {
      $gte: moment(date).startOf("day"),
      $lte: moment(date).endOf("day"),
    },
  }).then((data) => {
    console.log(data);
    res.json({
      result: true,
      trips: data,
    });
  });
});

module.exports = router;
