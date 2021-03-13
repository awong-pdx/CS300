const router = require('express').Router();
let Room = require('../models/room.model');

router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newRoom = new Room({
    username,
    description,
    duration,
    date,
  });

  newRoom.save()
  .then(() => res.json('Room added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

  router.route('/:id').get((req, res) => {
    Room.findById(req.params.id)
      .then(room => res.json(room))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Room.findByIdAndDelete(req.params.id)
      .then(() => res.json('Room deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Room.findById(req.params.id)
      .then(room => {
        room.username = req.body.username;
        room.description = req.body.description;
        room.duration = Number(req.body.duration);
        room.date = Date.parse(req.body.date);
        room.save()
          .then(() => res.json('Room updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


//router.route('/').get((req, res) => {
//  Room.find()
//    .then(rooms => res.json(rooms))
//    .catch(err => res.status(400).json('Error: ' + err));
//});

//router.route('/add').post((req, res) => {
//  const username = req.body.username;
//  const description = req.body.description;
//  const duration = Number(req.body.duration);
//  const date = Date.parse(req.body.date);
//
//  const newRoom = new Room({
//    username,
//    description,
//    duration,
//    date,
//  });
//
//  newRoom.save()
//  .then(() => res.json('Room added!'))
//  .catch(err => res.status(400).json('Error: ' + err));
//});

module.exports = router;