const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes); /* Forwards all server requests to the first arg.
                                        First argument is a "filter" that looks for 
                                        requests starting w/ the given path, and the
                                        second arg. is a handler. Requests will be
                                        forwarded to the file given in productRoutes.*/


app.use('/orders', orderRoutes); 
module.exports = app;