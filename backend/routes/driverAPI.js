const express = require("express");
const { Rider, Driver } = require("../models/user");
const { Booking } = require("../models/booking");
const router = express.Router();

router.post("/signup", (req, res, next) => {
    const temp = req.body;
    const pload = {
        username: temp.firstname + "-" + temp.lastname,
        contact: temp.contact,
        email: temp.email,
        password: temp.password,
        address: temp.address,
        licence_number: temp.licence_number,
    };

    pload.rating = 0;
    pload.image_url = "http://placehold.jp/150x150.png";

    Driver.create(pload)
        .then((data) => res.json(data))
        .catch(next);
});

router.get("/getRequestsForDriver", (req, res, next) => {
    const timestamp = Date.now();
    console.log(timestamp);
    const pickupLat = req.body.pickupLat;
    const pickupLng = req.body.pickupLng;
    if (!timestamp || !pickupLat || !pickupLng) {
        return res.status(422).json("A required field is empty");
    }
    Booking.find(
        {
            timestamp: { $gt: timestamp - 2 * 1000 * 60 },
            pickupLat: { $gt: pickupLat - 0.1, $lt: pickupLat + 0.1 },
            pickupLng: { $gt: pickupLng - 0.1, $lt: pickupLng + 0.1 },
        },
        (err, docs) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(docs);
            }
        }
    );
});

module.exports = router;