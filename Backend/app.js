const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/UserRouter')
const loginRouter = require('./controllers/login')
const SubGredditRouter = require('./controllers/SubGredditRouter')
const PostsRouter = require('./controllers/PostRouter')
const ReportRouter = require('./controllers/ReportRouter')
const ChatRouter = require('./controllers/ChatRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI
const connection = mongoose.connection
const fileUpload = require('express-fileupload');
mongoose.set("strictQuery", false)
mongoose.connect(mongoUrl, { useNewurlParser: true }).then(() => {
  logger.info('connected to MongoDB')
})
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
connection.once('open', () => {
  logger.info(`MongoDB Database connection Established Successfully`)
})
const io = require("socket.io")(3003, {
  cors: {
    origin: ["http://localhost:5000"]
  }
});
// Listen for new connections
io.on('connection', (socket) => {
  console.log('A user connected');
  // Listen for incoming messages
  socket.on('message', async (data) => {
    console.log(`Received message from ${data.username}: ${data.message}`);
    // Create a new message
    const message = new Chat({
      room: data.room,
      messages: {
        username: data.username,
        message: data.message,
      },
    });
    // Save the message to the database
    await message.save();
    // Broadcast the message to all clients in the room
    io.to(message.room).emit('message', {
      username: data.username,
      message: data.message,
    });
  });
  // Listen for the user joining a room
  socket.on('join', (data) => {
    console.log(`${data.username} joined room ${data.room}`);
    // Join the user to the room
    socket.join(data.room);
  });
  // Listen for the user leaving a room
  socket.on('leave', (data) => {
    console.log(`${data.username} left room ${data.room}`);
    // Leave the user from the room
    socket.leave(data.room);
  });
  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(5000, () => {
  console.log('Server running on port 5000');
});


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.userExtractor)
app.use(fileUpload());
app.use('/api/SubGreddiits', SubGredditRouter)
app.use('/api/Chat', ChatRouter)
app.use('/api/Reports', ReportRouter)
app.use('/api/Posts', PostsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app