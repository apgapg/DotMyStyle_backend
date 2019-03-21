const express = require('express');
const Feed = require("../models/feed");
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    Feed.find({})
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
