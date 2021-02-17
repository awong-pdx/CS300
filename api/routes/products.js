const express = require('express');
const router = express.Router(); /* subpackage express framework ships w/ to handle 
                                    different routes, HTTP words, etc. */
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else{
        cb(null, false);
    }

};

const upload = multer({ /* Initializes multer so it can be used*/
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); 

const Product = require('../models/product');

/* Handle get requests. */                                    
router.get('/', (req, res, next) => {
    Product.find() /*Gets all products; find could add further filters: limit for a specific num. of items, etc. */
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id /*Could/should change to where server is located (not local host) - see ~10:32 "Mongoose Validation" on YT. */
                        }
                    }
                })
            };
            //if(docs.length >= 0) {
                res.status(200).json(response);
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
router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    /*Commented out product was replaced with mongoose version for use w/ MongoDB (so can save new products to DB). */
    //const product = { /*Documentation for this API would include what properties to include in the request body. */
    //    name: req.body.name,
    //    price: req.body.price
    //};
    const product = new Product({ /*Uses the model defined in ../models/product as a constructor. */
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
    .save()
    .then(result => {/* method provided by mongoose to save to MongoDB. */
        console.log(result);
        res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result.id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" + result._id
                }
            }
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
    .select('name price _id productImage') /*Specify exactly which fields to include in response. */
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products'
                }
            });
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

router.patch('/:productID', checkAuth, (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, { $set: updateOps }) /*Video "MongoDB and Mongoose" recommended '.update', which was deprecated a/of 2/15/2021 */
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

/*Delete by product ID. */
router.delete('/:productID', checkAuth, (req, res, next) => {
    const id = req.params.productID;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



module.exports = router;