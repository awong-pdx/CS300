const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const http = require('http').Server(app);
const io = require('socket.io')(http);
var path = require('path');
const Room = require('./models/room.model');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+ '/../public/index.html'));
  //res.send('<h1>Hello world</h1>');
});





http.listen(3001, () => {
  console.log('listening on *:3001');
})

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const roomsRouter = require('./routes/rooms');
const { Socket } = require('socket.io');
const Message = require('./models/message.model');
const router = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/rooms', roomsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);

    const newMessage = new Message({
      username: "default",
      content: msg
    });

    //var id = "604ed0797738394e0874d45a";
    //const curRoom = Room.findById(id);
    //curRoom.messages.push(newMessage);
    //curRoom.save();
    const testRoom = new Room({
    username: "default",
    description: "test",
    date: "2021-03-13T02:49:40.938+00:00",
    participants: [],
    messages: [newMessage]
    });
    testRoom.save();



    //roomsRouter.route('/update/604ed0797738394e0874d45a').post((req, res) => {
    //  Room.findById('/update/604ed0797738394e0874d45a')
    //    .then(room => {
    //      room.messages.push(newMessage);
    //      room.save()
    //          .then(() => res.json('Room Updated!'))
    //          .catch(err => res.status(400).json('Error: ' + err));
    //    })
    //    .catch(err => res.status(400).json('Error: ' + err));
    //});
    newMessage.save();
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

