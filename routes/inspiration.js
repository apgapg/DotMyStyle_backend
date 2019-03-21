const express = require('express');
const Inspiration = require("../models/inspiration");
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    Inspiration.find({})
        .sort({
            updatedAt: -1
        })
        .exec(function (err, logs) {
            if (err) next(err);
            else {
                res.send(logs);
            }
        });
});

module.exports = router;
