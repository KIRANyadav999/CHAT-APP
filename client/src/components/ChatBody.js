import React from 'react'
import {useNavigate} from "react-router-dom" 

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload(); // Reload to reset state and socket connection for new user
  };

  return (
    <>
      {/* Header */}
      <header className='w-full h-[10vh] bg-gray-800 text-white flex items-center justify-between p-5 shadow-md z-10'>
          <p className="text-xl font-semibold">Hangout with the World</p>
          <button
            className='py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300'
            onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
      </header>

      {/* Messages Container */}
      <div className='flex-grow w-full h-[80vh] p-5 bg-gray-900 overflow-y-auto'>
        <div className="space-y-4">
          {messages.map(message => (
            message.name === userName ? (
              // Sender's message (You)
              <div className="flex flex-col items-end" key={message.id}>
                <p className='text-xs text-gray-400 mb-1'>You</p>
                <div className='bg-blue-600 text-white p-3 rounded-lg rounded-br-none max-w-xs md:max-w-md shadow-md'>
                    <p>{message.text}</p>
                </div>
              </div>
            ) : (
              // Recipient's message
              <div className="flex flex-col items-start" key={message.id}>
                <p className='text-xs text-gray-400 mb-1'>{message.name}</p>
                <div className='bg-gray-700 text-white p-3 rounded-lg rounded-bl-none max-w-xs md:max-w-md shadow-md'>
                    <p>{message.text}</p>
                </div>
              </div>
            )
          ))}
        </div>
        {/* Typing Status */}
        <div className='h-6 mt-2'>
          <p className="text-gray-400 italic text-sm">{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody
