const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  User.find({ username: req.body.username })
    //.exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Account with username already exists'
        });
      }
      else {
    //const username = req.body.username;
    /*const password =*/ bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
        else {
          const newUser = new User({
            username: req.body.username,
            password: hash
          });

          newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      });
      }
    })
});

module.exports = router;