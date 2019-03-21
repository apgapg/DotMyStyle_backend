const express = require('express');
const Promotion = require("../models/promotion");
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    Promotion.find({})
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
