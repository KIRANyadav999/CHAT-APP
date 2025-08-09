import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", data => setMessages(prevMessages => [...prevMessages, data]));
    return () => socket.off("messageResponse");
  }, [socket]);

  useEffect(() => {
    socket.on("typingResponse", data => setTypingStatus(data));
    return () => socket.off("typingResponse");
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900">
      <ChatBar socket={socket} />
      <main className='flex-grow flex flex-col'>
        <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </main>
    </div>
  );
};

export default ChatPage
