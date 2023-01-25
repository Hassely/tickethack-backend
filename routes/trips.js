var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");
const moment = require("moment");

/* Post consultation d'un voyage. */
router.post("/", function (req, res) {
  const { departure, arrival, date } = req.body;
  if (!departure || !arrival || !date) {
    return res.json({
      result: false,
      error: "Veuillez saisir l'un des champs !",
    });
  }

  try {
    const startDate = new Date(date).setUTCHours(0, 0, 0);
    const endDate = new Date(date).setUTCHours(23, 59, 59, 59);
    // Todo : régler le problématique de la date invalide => crash serveur !tr

    Trip.find({
      departure,
      arrival,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).then((data) => {
      if (data.length === 0) {
        return res.json({
          result: false,
          error: "Aucune destination disponible pour cette date",
        });
      } else return res.json({ result: true, trips: data });
    });
  } catch (error) {
    return res.json({
      result: false,
      error: "Une erreur est survenue !",
    });
  }
});

// Sélection d'un voyage part ID
router.get("/:id", async (req, res) => {
  try {
    const searchedTrip = await Trip.findById(req.params.id);

    return res.json({ result: true, trip: searchedTrip });
  } catch (error) {
    return res.json({
      result: false,
      error: "Une erreur est survenue !",
    });
  }
});

module.exports = router;
