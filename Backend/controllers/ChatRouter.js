const Chat = require("../models/Chat.model")
const { request } = require('express')
const ChatRouter = require('express').Router()

ChatRouter.get("/:room", async (request, response) => {
    const room = request.params.room
    const OneChat = await Chat
        .find({ room })
    response.json(OneChat)
})

ChatRouter.put("/:room", async (request, response) => {
    const room = request.params.room
    const {
        username,
        message,
    } = request.body
    const OneChat = await Chat
        .find({ room })
    OneChat.messages = OneChat.messages.concat({
        username: username,
        message: message    })
    const updatedChat = await OneChat.save()
    response.json(updatedChat)
})

ChatRouter.post("/", async (request, response) => {
    const {
        room
    } = request.body
    const NewChat = new Chat({
        room: room,
        messages: []
    })
    const CreatedChat = await NewChat.save()
    response.json(CreatedChat)
}) 