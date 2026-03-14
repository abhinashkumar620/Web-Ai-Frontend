import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import axios from 'axios'

const Generate = () => {

    const navigate = useNavigate()

    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const hendleGenerateWebsite = async () => {

        try {

            setLoading(true)
            setProgress(5)

            // Fake progress animation
            const interval = setInterval(() => {

                setProgress((prev) => {

                    if (prev >= 90) {
                        clearInterval(interval)
                        return prev
                    }

                    return prev + 5

                })

            }, 500)


            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/website/generate`,
                { prompt },
                { withCredentials: true }
            )

            // console.log(result)
            setPrompt("")
            setProgress(100)

            setTimeout(() => {
                navigate('/dashboard')
                setLoading(false)
            }, 600)

        } catch (error) {

            console.error(error)
            setLoading(false)

        }

    }

    const SubmimteHendeler = (e) => {

        e.preventDefault()

        if (!prompt.trim()) return

        hendleGenerateWebsite()

        setPrompt("")

    }

    return (

        <div className='min-h-screen bg-[#050505] text-white flex flex-col'>

            {/* Navbar */}

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10 '
            >

                <div className='max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center '>

                    <div className='flex items-center gap-3'>

                        <motion.button
                            onClick={() => navigate('/dashboard')}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            className='p-2 rounded-lg md:hover:bg-white/20 transition'
                        >
                            <FaArrowLeft />
                        </motion.button>

                        <h2 className='text-lg font-semibold'>
                            Gan Web AI
                        </h2>

                    </div>

                </div>

            </motion.div>


            {/* Hero */}

            <div className="flex-1 flex items-center justify-center">

                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">

                    {/* Heading */}

                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight"
                    >
                        Build & Launch <br />

                        <span className="bg-white bg-clip-text text-transparent">
                            Websites With AI
                        </span>
                    </motion.h1>


                    {/* Description */}

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base"
                    >
                        Describe your idea and our AI will generate a modern website layout for you in seconds.
                    </motion.p>


                    {/* Input Section */}

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 sm:mt-14 max-w-3xl mx-auto"
                    >

                        <h2 className="text-xs sm:text-sm text-white/60 mb-2 sm:mb-3 text-left">
                            Describe your website
                        </h2>

                        <form onSubmit={SubmimteHendeler} className="relative">

                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your website in detail..."
                                className="w-full min-h-[140px] sm:min-h-[170px] resize-none bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none focus:border-white/30 focus:bg-white/10 transition"
                            />

                            {/* Button */}

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-3 sm:absolute sm:bottom-3 sm:right-3 w-full sm:w-auto px-4 py-2 bg-white text-black text-sm sm:text-base rounded-lg font-semibold"
                            >
                                {loading ? "Generating..." : "Generate"}
                            </motion.button>

                        </form>

                    </motion.div>

                </div>

            </div>


            {/* Progress Bar */}

            {loading && (

                <div className="w-[40%] mx-auto mb-10">

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-green-400 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />

                    </div>

                    <p className="text-center text-xs text-gray-400 mt-2">
                        Generating Website... {progress}%
                    </p>

                </div>

            )}

        </div>

    )

}

export default Generate