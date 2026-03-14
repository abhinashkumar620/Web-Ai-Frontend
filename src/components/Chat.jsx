import axios from 'axios';
import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useParams } from 'react-router-dom';

const Chat = ({ code, setCode, message, setMessage }) => {

    const { id } = useParams()
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {

        setMessage((m) => [...m, { role: "user", content: prompt }])
        setPrompt("")
        setLoading(true)

        try {

            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/website/update/${id}`,
                { prompt },
                { withCredentials: true }
            )

            console.log("is update valu:--", result);

            setMessage((m) => [...m, { role: "ai", content: result.data.message }])
            setCode(result.data.code)

        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col h-full  w-[260px] sm:w-[390px] ">

            {/* Messages */}
            <div id='scroChat' className=" overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4  h-[82vh] ">

                {message.map((msg, index) => (

                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} `}
                    >
                        <div
                            className={`max-w-[85%] sm:max-w-[70%] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm leading-relaxed break-words leading-tight
                            ${msg.role === "user"
                                    ? "bg-white text-black rounded-br-none"
                                    : "bg-white/20 text-gray-200 rounded-bl-none"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>

                ))}

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-start">
                        <div className="max-w-[85%] sm:max-w-[70%] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm bg-white/20 text-gray-200 rounded-bl-none animate-pulse">
                            Loading...
                        </div>
                    </div>
                )}

            </div>

            {/* Input Box */}
            <div className='p-2 border-t border-white/10 bg-black pb-5 '>

                <div className='flex items-start gap-2 border rounded border-white/40 p-2 sm:p-3 mb-11'>

                    <input
                        id='chat_a'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Describe Changes...'
                        className='flex-1 bg-transparent outline-none resize-none text-xs sm:text-sm max-h-36 overflow-y-auto text-white placeholder:text-gray-400'
                    />

                    <button onClick={handleUpdate} className="p-2  bg-white text-black rounded hover:scale-105 transition flex items-center justify-center">
                        <IoIosSend size={14} />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Chat