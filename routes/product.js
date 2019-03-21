const express = require('express');
const Product = require("../models/product");
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    Product.find({})
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
