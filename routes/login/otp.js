const express = require('express');
const router = express.Router();
const SendOtp = require('sendotp');
const User = require('../../models/user');
const sendOtp = new SendOtp('116701AeExtkERH57653697');
const axios = require("axios");
const jwt = require("jsonwebtoken");

router.post('/sendotp', function (req, res, next) {
    const number = req.body.number;
    const pattern = new RegExp("^[0][1-9]\\d{9}$|^[1-9]\\d{9}$");
    if (pattern.test(number)) {
        axios.get('https://2factor.in/API/V1/e305fb55-4c69-11e9-8806-0200cd936042/SMS/' + number + '/AUTOGEN')
            .then(response => {
                console.log(response.data.url);
                console.log(response.data.explanation);
                console.log(response.data);
                res.send(response.data);
            })
            .catch(error => {
                console.log(error);
                error.status(500);
                next(error);
            });
        /* sendOtp.send(number, "DOTMYSTYLE", function (error, data) {
             if (error) {
                 console.log(error);
                 error.status(500);
                 next(error);
             } else {
                 console.log(data);
                 res.send("OTP send successfully");
             }
         });*/
    }

});


router.post('/verifyotp', function (req, res, next) {
    const sessionId = req.body.session_id;
    const otp = req.body.otp_input;
    const phone = req.body.phone;
    if (sessionId && otp && phone) {
        axios.get(`https://2factor.in/API/V1/e305fb55-4c69-11e9-8806-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`)
            .then(response => {
                console.log(response.data);
                const user = new User({'phone': phone});
                const conditions = {
                    'phone': user.phone,
                };
                const options = {
                    'upsert': true
                };
                User.findOneAndUpdate(conditions, {'phone': user.phone,}, options, function (err, user) {
                    if (err) {
                        debug(err);
                        err.message = "error: invalid user details";
                        err.status = 400;
                        next(err);
                    } else {
                        console.log(user);
                        const payload = {
                            jti: user._id,
                            iss: "https:\/\/dotmystyle.com",
                        };
                        jwt.sign(payload, process.env.SECRET, {}, function (err, token) {
                            if (err)
                                res.sendStatus(500);
                            else
                                res.send({token: token,});
                        });
                    }
                });


            })
            .catch(error => {
                console.log(error);
                res.sendStatus(400);
            });
    } else {
        res.sendStatus(400);
    }

});


module.exports = router;
