import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaPlus } from 'react-icons/fa6'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { GoCopy } from "react-icons/go";

const Dashboard = () => {

    const navigate = useNavigate()

    const [websites, setWebsites] = useState([])
    const [loading, setLoading] = useState(true)

    const { userData } = useSelector(state => state.user)

    useEffect(() => {

        const handleGetAllWebsites = async () => {

            try {

                const result = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/website/get-all`,
                    { withCredentials: true }
                )

                console.log(result.data)

                setWebsites(result.data || [])

            } catch (error) {

                console.error(error)
                toast.error("Website fetch failed")

            } finally {
                setLoading(false)
            }

        }

        handleGetAllWebsites()

    }, [])

    return (
        <div className='min-h-screen bg-[#050505] text-white'>

            {/* Top Navbar */}

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className='sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10'
            >

                <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>

                    <div className='flex items-center gap-3'>

                        <motion.button
                            onClick={() => navigate('/')}
                            whileTap={{ scale: 0.9 }}
                            className='p-2 rounded-lg hover:bg-white/10 transition'
                        >
                            <FaArrowLeft />
                        </motion.button>

                        <h2 className='text-lg font-semibold'>
                            Dashboard
                        </h2>

                    </div>

                    <motion.button
                        onClick={() => navigate('/generate')}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className='px-4 py-2 flex items-center gap-2 rounded-lg bg-white text-black text-sm font-semibold'
                    >
                        <FaPlus />
                        <span className='hidden sm:block'>Build a Website</span>
                    </motion.button>

                </div>

            </motion.div>


            {/* Content */}

            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>

                {/* Greeting */}

                <div className='text-gray-400 text-sm mb-8'>
                    Hello, {userData?.name}
                </div>

                {/* Loading */}

                {loading ? (

                    <div className='flex justify-center items-center h-[50vh]'>

                        <div className='flex flex-col items-center gap-3'>

                            <div className='w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin'></div>

                            <p className='text-gray-400 text-sm'>
                                Loading websites...
                            </p>

                        </div>

                    </div>

                ) : websites.length === 0 ? (

                    <div className='text-center text-gray-500 mt-20'>
                        No websites created yet
                    </div>

                ) : (

                    /* Website Cards */

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                        {websites.map((item) => (

                            <div

                                key={item._id}
                                className="bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden hover:scale-[1.03] hover:border-white/30 transition duration-300 cursor-pointer"
                            >

                                {/* Preview */}

                                <div onClick={() => navigate(`/editor/${item._id}`)} className="relative h-44 bg-black overflow-hidden">

                                    <iframe
                                        srcDoc={item.latestCode}
                                        title="preview"
                                        loading="lazy"
                                        className="absolute top-0 left-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none"
                                    />

                                </div>

                                {/* Title */}
                                <div className="flex justify-between items-center px-4 py-3 border-t border-white/10">

                                    {/* Title */}
                                    <p className="text-sm font-medium">
                                        {item.title || "Untitled Website"}
                                    </p>

                                    {/* Copy Icon */}
                                    <button
                                        className="text-lg hover:text-white/70 transition cursor-pointer"
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.latestCode)
                                            toast.success("Code copied!")
                                        }}
                                    >
                                        <GoCopy />
                                    </button>

                                </div>
                            </div>

                        ))}

                    </div>

                )}

            </div>

            <ToastContainer position="top-right" autoClose={2000} />

        </div>
    )
}

export default Dashboard