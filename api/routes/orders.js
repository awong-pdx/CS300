const express = require('express');
const router = express.Router(); /* subpackage Express framework ships w/ to handle 
                                    different routes, HTTP words, etc. */

                                
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    };
    res.status(201).json({         /* Status code 201 indicates successful creation. */
        message: 'Order was created',
        order: order
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({  
        message: 'Order details',
        orderID: req.params.orderID
    });
});

router.delete('/:orderID', (req, res, next) => {
    res.status(200).json({  
        message: 'Order was deleted',
        orderID: req.params.orderID
    });
});

module.exports = router;