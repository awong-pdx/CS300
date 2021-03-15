const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;