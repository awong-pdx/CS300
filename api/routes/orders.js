const express = require('express');
const router = express.Router(); /* subpackage Express framework ships w/ to handle 
                                    different routes, HTTP words, etc. */
const checkAuth = require('../middleware/check-auth');

const OrdersController =  require('../controllers/orders');
//import OrdersController from '../controllers/orders';
                                
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderID', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderID', checkAuth, OrdersController.orders_delete_order);

module.exports = router;