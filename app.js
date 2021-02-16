const express = require('express');
const app = express();
const morgan = require('morgan'); /* Middleware used for logging. */

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

/* Routes which should handle requests. */
app.use('/products', productRoutes); /* Forwards all server requests to the first arg.
                                        First argument is a "filter" that looks for 
                                        requests starting w/ the given path, and the
                                        second arg. is a handler. Requests will be
                                        forwarded to the file given in productRoutes.*/

app.use('/orders', orderRoutes); 

/*Handle errors (any requests that make it to this point). */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); /*Forwards the error request. */
})

app.use((error, req, res, next) => {
    res.status(error.status || 500); /*500 for all other types of errors. */
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;