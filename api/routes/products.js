const express = require('express');
const router = express.Router(); /* subpackage express framework ships w/ to handle 
                                    different routes, HTTP words, etc. */
const mongoose = require('mongoose');

const Product = require('../models/product');

/* Handle get requests. */                                    
router.get('/', (req, res, next) => {
    Product.find() /*Gets all products; find could add further filters: limit for a specific num. of items, etc. */
        .exec()
        .then(docs => {
            console.log(docs);
            //if(docs.length >= 0) {
                res.status(200).json(docs);
            //}
            //else {
            //    res.status(404).json({
            //        message: 'No entries found'
            //    });
            //}
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


/*Handle post requests. */
router.post('/', (req, res, next) => {
    /*Commented out product was replaced with mongoose version for use w/ MongoDB (so can save new products to DB). */
    //const product = { /*Documentation for this API would include what properties to include in the request body. */
    //    name: req.body.name,
    //    price: req.body.price
    //};
    const product = new Product({ /*Uses the model defined in ../models/product as a constructor. */
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {/* method provided by mongoose to save to MongoDB. */
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        });/** */
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

/*For specific products, specified by product ID. */
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID; /* params.xxx: xxx must match the /:xxx specified in previous line. */
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, { $set: updateOps }) /*Video "MongoDB and Mongoose" recommended '.update', which was deprecated a/of 2/15/2021 */
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

/*Delete by product ID. */
router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



module.exports = router;