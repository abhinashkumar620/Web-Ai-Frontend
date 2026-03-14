import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import LoginModal from '../components/LoginModal'
import { FiArrowRight } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { LuCoins } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { BiLogoMagento } from "react-icons/bi";

const Home = () => {

    const navigate = useNavigate()

    const [openLogin, setOpenLogin] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    // const data = [
    //     {
    //         name: 'Abhinash',
    //         age: 38,
    //         Address: 'Delhi gurugram, Punjab, Haryana'
    //     },
    //     {
    //         name: 'Abhinash',
    //         age: 38,
    //         Address: 'Delhi gurugram, Punjab, Haryana'
    //     },
    //     {
    //         name: 'Abhinash',
    //         age: 38,
    //         Address: 'Delhi gurugram, Punjab, Haryana'
    //     }
    // ]

    const { userData } = useSelector(state => state.user)
    // console.log(userData);



    const dispatch = useDispatch()



    const handleLogOut = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                withCredentials: true
            })
            dispatch(setUserData(null))
            setOpenProfile(false)
            toast.success("Logged Out Successfully")

        } catch (error) {
            console.error(error);

        }

    }

    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>

            {/* Navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
            >

                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>

                    <Link to={'/'} className='text-lg flex justify-between items-center gap-1 font-semibold'>
                        <BiLogoMagento /> Web Ai
                    </Link>

                    <div className='flex items-center gap-5'>

                        {userData && (
                            <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm sm:text-base">

                                <LuCoins className="text-yellow-400 text-lg sm:text-xl" />

                                <span className="hidden sm:block">Credits</span>

                                <span className="font-semibold">
                                    {userData.credits}
                                </span>

                                <FaPlus className="cursor-pointer text-green-400 hover:scale-110 transition" />

                            </div>
                        )}


                        {!userData ? (

                            <button
                                onClick={() => setOpenLogin(true)}
                                className='px-4 py-2 rounded-lg flex items-center gap-1 bg-white text-black font-medium text-sm cursor-pointer'
                            >
                                Get Started
                                <FiArrowRight />
                            </button>



                        ) : (

                            <div className=' relative '>
                                <button onClick={() => setOpenProfile(!openProfile)} className="flex items-center gap-2">

                                    <img
                                        src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`}
                                        alt="user"
                                        referrerPolicy='no-referrer'
                                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                    />

                                </button>

                                <AnimatePresence>
                                    {openProfile && (
                                        <motion.div

                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-64 sm:w-56 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden"
                                        >
                                            <div className="flex flex-col text-sm">

                                                {/* User Info */}
                                                <div className="px-4 py-3 border-b border-white/10">
                                                    <p className="font-medium text-white truncate">
                                                        {userData.name}
                                                    </p>
                                                    <p className="text-gray-400 text-xs truncate">
                                                        {userData.email}
                                                    </p>
                                                </div>

                                                {/* Dashboard */}
                                                <button onClick={() => navigate('/dashboard')} className="px-4 py-3 text-left hover:bg-zinc-800 transition text-gray-300 cursor-pointer">
                                                    Dashboard
                                                </button>

                                                {/* Credits */}
                                                <div className="px-4 py-3 border-y border-white/10 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <LuCoins className="text-yellow-400 text-lg" />
                                                        <span className="text-gray-300">Credits</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-white">
                                                            {userData.credits}
                                                        </span>
                                                        <FaPlus className="cursor-pointer text-green-400 hover:scale-110 transition" />
                                                    </div>
                                                </div>

                                                {/* Logout */}
                                                <button onClick={handleLogOut} className="px-4 py-3 text-left text-red-400 hover:bg-red-500/20 hover:text-red-300 transition cursor-pointer">
                                                    Logout
                                                </button>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        )}


                    </div>

                </div>
            </motion.div>


            {/* Hero Section */}
            <section className="pt-44 min-h-screen justify-center  pb-32 px-6 text-center flex flex-col items-center">
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-6xl font-bold leading-tight text-white tracking-wide"
                >
                    Build Websites <br />

                    <span className="bg-gradient-to-r from-green-500 via-pink-100 to-red-500 bg-clip-text text-transparent">
                        With AI
                    </span>
                </motion.h1>


                {/* Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-6 text-gray-300 text-sm md:text-xl max-w-2xl"
                >
                    Turn your idea into a{" "}
                    <span className="bg-gradient-to-r from-green-500 via-pink-100 to-red-500 bg-clip-text text-transparent font-semibold">
                        modern AI-powered
                    </span>{" "}
                    responsive website in seconds.
                </motion.p>


                {/* Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => userData ? navigate('/generate') : setOpenLogin(true)}
                    className="mt-8 border border-white/20 bg-white text-black md:px-6 md:py-3 rounded-xl font-semibold hover:bg-white/10 hover:text-white backdrop-blur-md transition duration-300 cursor-pointer px-3 py-2"
                >
                    {userData ? 'Generate Website' : 'Get Started'}
                </motion.button>

            </section>





            {/* Login Modal */}
            {
                openLogin &&
                <LoginModal
                    isOpen={openLogin}
                    onClose={() => setOpenLogin(false)}
                />
            }
            <ToastContainer position="top-right" autoClose={2000} />

        </div>
    )
}

export default Home