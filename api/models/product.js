/*Defines how products should look like in application (for use w/ Mongoose) */
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema); /*First arg: name of model that you want to use internally,
                                                             second arg: schema you want to use for that mode. */