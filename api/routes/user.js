const express = require('express');
const router = express.Router(); /* subpackage Express framework ships w/ to handle 
                                    different routes, HTTP words, etc. */

const UserController =  require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;