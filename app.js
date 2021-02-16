const express = require('express');
const app = express();
const morgan = require('morgan'); /* Middleware used for logging. */
const bodyParser = require('body-parser'); /* Parse request body content. */

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev')); /*Logger should be in front of other .use commands. */
/*Body parsing for URL and JSON formats. */
app.use(bodyParser.urlencoded({extended: false})); /* 'Extended: true' allows extended bodies w/ rich data (?). */
app.use(bodyParser.json()); /* Extract JSON data and make it readable. */

/* CORS error handling (to allow for client-server interaction w/ both @ diff. addresses/locations (?).) */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); /* '*' gives access to clients from any origin. */
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); /* All the HTTP requests you want to support w/ this API. */
        return res.status(200).json({});
    }
    next();
});

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