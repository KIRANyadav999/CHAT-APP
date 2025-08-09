import React, {useState} from 'react'

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState("");

    const handleTyping = () => {
        const userName = localStorage.getItem("userName");
        if (userName) {
            socket.emit("typing", `${userName} is typing...`);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const userName = localStorage.getItem("userName");
        if (message.trim() && userName) {
            socket.emit("message", {
                text: message,
                name: userName,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id
            });
             socket.emit("typing", ""); // Clear typing status after sending
        }
        setMessage("");
    };

    return (
        <div className='h-[10vh] bg-gray-800 p-4'>
            <form className='h-full flex items-center gap-4' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='flex-grow h-full rounded-lg border-2 border-transparent focus:border-yellow-400 bg-gray-700 text-white px-4 outline-none transition-all'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="h-full px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-md transition-all duration-300">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter
