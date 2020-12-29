const { json } = require('express');
const express = require('express');
const morgan = require('morgan');
const { get } = require('./router/tourRoute');

const tourRouter = require('./router/tourRoute')

const app = express();

//1.MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json());

//3 ROUTES
app.use('/api/v1/tours', tourRouter)

//console.log(tours)
//Handling unhandled routes
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `cant find ${req.originalUrl} on this server`
    // })
    const err = new Error(`cant find ${req.originalUrl} on this server`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err)
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })

})

//4. SERVER

module.exports = app;