const mongoose = require('mongoose')
// Define the chat schema
const chatSchema = new mongoose.Schema({
    room: String,
    messages: [{
        username: String,
        message: String,
        created: { type: Date, default: Date.now }
    }],
});
// Create the chat model
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat