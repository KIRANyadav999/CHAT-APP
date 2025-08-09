import React, {useState, useEffect} from 'react'

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Listens for the list of active users from the server
        socket.on("newUserResponse", data => setUsers(data));
        // Cleanup listener on component unmount
        return () => socket.off("newUserResponse");
    }, [socket]);

    return (
        <div className='w-full md:w-1/4 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-5 flex flex-col'>
            <h2 className="text-2xl font-bold mb-8">Open Chat</h2>
            <div>
                <h4 className='text-lg font-semibold mb-4 border-b border-gray-600 pb-2'>ACTIVE USERS</h4>
                <div className='space-y-3 mt-4'>
                    {users.map(user => (
                        <p key={user.socketID} className="text-gray-300">{user.userName}</p>
                    ))}
                </div>
            </div>
      </div>
    );
};

export default ChatBar
