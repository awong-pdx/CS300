const mongoose = require('mongoose');
//const Message = require('./message.model');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  //participants: [String],
  participants: [{type: Schema.ObjectId, ref: 'User'}],
  //messages: [String],
  messages: [{type: Schema.ObjectId, ref: 'Message'}],
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;