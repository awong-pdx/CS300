const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

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

router.route('/login').post((req, res) => {
  User.find({username: req.body.username})
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json('Auth failed');
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json('Auth failed');
      }
      if (result) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {             
            expiresIn: "1h"
          }
        );
        return res.status(200).json({
          Message: 'Auth successful',
          token: token
        });
      }
      res.status(401).json('Auth failed');
    });
  });
});

module.exports = router;