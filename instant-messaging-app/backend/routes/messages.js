const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
let Message = require('../models/message.model');

router.route('/').get((req, res) => {
  Message.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;

  const newMessage = new Message({
    username,
    content,
  });

  newMessage.save()
  .then(() => res.json('Message added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Message.findById(req.params.id)
        .then(message => res.json(message))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Message.findByIdAndDelete(req.params.id)
        .then(() => res.json('Message deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Message.findById(req.params.id)
        .then(message => {
            message.username = req.body.username;
            message.content = req.body.content;
            message.save()
                .then(() => res.json('Message updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;