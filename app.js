const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const otpRouter = require('./routes/login/otp');
const stylistRouter = require('./routes/stylist');
const inspirationRouter = require('./routes/inspiration');
const promotionRouter = require('./routes/promotion');
const salonRouter = require('./routes/salon');
const feedRouter = require('./routes/feed');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const jwt = require("jsonwebtoken");
const bearerToken = require('express-bearer-token');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bearerToken());

app.use('/', indexRouter);
app.use('/api/v1/login/otp', otpRouter);
app.use('/api/v1/dot/*', function (req, res, next) {
    jwt.verify(req.token, process.env.SECRET, function (err, decoded) {
        if (err) {
            console.log(err);
            next(createError(401));
        } else {
            console.log(decoded);
            next();
        }
    });
});
app.use('/api/v1/dot/stylist', stylistRouter);
app.use('/api/v1/dot/inspirations', inspirationRouter);
app.use('/api/v1/dot/promotions', promotionRouter);
app.use('/api/v1/dot/salons', salonRouter);
app.use('/api/v1/dot/feeds', feedRouter);
app.use('/api/v1/dot/products', productRouter);
app.use('/api/v1/dot/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
