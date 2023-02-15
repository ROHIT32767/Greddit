import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3003");
    socket.on("new message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  }, [messages]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = io("http://localhost:3003");
    socket.emit("new message", message);
    setMessage("");
  };
  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
