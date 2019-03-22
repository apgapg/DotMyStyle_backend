const express = require('express');
const Category = require("../models/category");
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    Category.find({})
        .exec(function (err, categories) {
            if (err) next(err);
            else {
                res.send(categories);
            }
        });
});

module.exports = router;
