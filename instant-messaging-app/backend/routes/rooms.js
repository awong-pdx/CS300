const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
let Room = require('../models/room.model');

router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const participants = req.body.participants;
  const messages = req.body.messages;

  const newRoom = new Room({
    username,
    description,
    date,
    participants,
    messages
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
            room.date = Date.parse(req.body.date);
            room.participants = req.body.participants;
            room.messages = req.body.messages;
            room.save()
                .then(() => res.json('Room updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;