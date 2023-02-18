import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatService from "../services/Chat";
import { useParams } from "react-router-dom";
const Chat = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:3003');
  const params = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ChatService.getbyRoom(params.room)
        console.log("recieved", data)
        setMessages(data.messages)
        console.log("messages on Loading are", data.messages)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (data) => {
      setMessages((messages) => [...messages, data]);
    });
    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const handleSend = (event) => {
    event.preventDefault();
    // Send the message to the server
    socket.emit('message', {
      username,
      message,
    });
    const NewMessage = async () => {
      try {
        const data = await ChatService.create
          console.log("recieved", data)
      }
      catch (error) {
        console.log(error)
      }
    }
    NewMessage();
    // Clear the input field
    setMessage('');
  };
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.username}: </strong>
          <span>{message.message}</span>
        </div>
      ))}
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

