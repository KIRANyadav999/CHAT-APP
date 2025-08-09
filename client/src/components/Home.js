import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import Footer from './Footer'
const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            localStorage.setItem("userName", userName);
            // Emits the new user to the server
            socket.emit("newUser", { userName, socketID: socket.id });
            navigate("/chat");
        }
    };

    return (
        <div className='h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4'>
            <form className='w-full max-w-sm flex flex-col gap-4 items-center bg-gray-800 p-8 rounded-xl shadow-2xl' onSubmit={handleSubmit}>
                <h2 className='text-3xl font-bold mb-6 text-center'>Sign in to Open Chat</h2>
                <div className="w-full">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        minLength={6}
                        name="username"
                        id='username'
                        className='w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        required
                    />
                </div>
                <button className='w-full py-3 mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all duration-300 shadow-lg'>SIGN IN</button>
            </form>
            <Footer />
        </div>
    );
};

export default Home
