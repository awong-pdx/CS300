const express = require('express');
const router = express.Router(); /* subpackage express framework ships w/ to handle 
                                    different routes, HTTP words, etc. */

/* Handle get requests. */                                    
router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Handling GET requests to /products'
   });
});


/*Handle post requests. */
router.post('/', (req, res, next) => {
    const product = { /*Documentation for this API would include what properties to include in the request body. */
        name: req.body.name,
        price: req.body.price
    };
   res.status(201).json({
       message: 'Handling POST requests to /products',
       createdProduct: product
   });
});

/*For specific products, specified by product ID. */
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID; /* params.xxx: xxx must match the /:xxx specified in previous line. */
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
});

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});



module.exports = router;