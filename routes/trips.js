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
  const enDate = new Date(date).setUTCHours(23, 59, 59, 59);

  // function addHours(date1, hours) {
  //   date1.setHours(date1.getHours() + hours);

  //   return date1;
  // }

  // // const date1 = new Date("2022-05-15T12:00:00.000Z");

  // // const newDate = addHours(date1, 5);

  // console.log(newDate);

  Trip.find({
    departure,
    arrival,
    date: {
      $gte: startDate,
      $lte: enDate,
    },
  }).then((data) => {
    // console.log("je veux voir la date", new Date());
    console.log(data);
    res.json({
      result: true,
      trips: data,
    });
  });
});

module.exports = router;
