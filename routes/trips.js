var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");

/* Post consultation d'un voyage. */
router.post("/", function (req, res) {
  const { departure, arrival, date } = req.body;
  if (!departure || !arrival || !date) {
    res.json({
      result: false,
      error: "Veuillez saisir l'un des champs !",
    });
  }
  Trip.find({ departure, arrival, date }).then((res) => res.json);
});

module.exports = router;
