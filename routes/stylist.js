const express = require('express');
const Stylist = require('../models/stylist');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    Stylist.find({})
        .sort({
            updatedAt: -1
        })
        .limit(100)
        .exec(function (err, logs) {
            if (err) next(err);
            else {
                res.send(logs);
            }
        });
});

module.exports = router;
