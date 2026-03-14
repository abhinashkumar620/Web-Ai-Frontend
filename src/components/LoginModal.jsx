import React from "react";
import axios from 'axios'
import { motion } from "motion/react";
import { FiX } from "react-icons/fi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { ToastContainer, toast } from 'react-toastify';

const LoginModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/google`,
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    avatar: result.user.photoURL,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(setUserData(response.data))
            onClose()
            toast.success("Login Successful")
            // console.log(response.data);
        } catch (error) {
            console.error("Google Auth Error:", error);
        }
    };

    return (
        <>
            {
                isOpen && <div
                    onClick={onClose}
                    className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 px-4"
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 text-white shadow-2xl"
                    >

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-xl text-gray-300 hover:text-red-400 transition cursor-pointer"
                        >
                            <FiX />
                        </button>

                        {/* Title */}
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-semibold">
                                AI Website Builder
                            </h2>

                            <p className="text-sm text-gray-300">
                                Sign in to generate your AI powered website
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="my-6 border-t border-white/20"></div>

                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleAuth}
                            className="w-full flex items-center justify-center gap-3 border border-white/30 rounded-lg py-3 bg-white text-black font-medium hover:bg-gray-200  hover:scale-105 duration-300 transition-transform cursor-pointer"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
                                alt="google"
                                className="w-5 h-5"
                            />

                            Continue with Google
                        </button>

                        <div className="mt-8">

                            {/* Divider */}
                            <div className="flex items-center gap-4 text-gray-400 text-sm">

                                <span className="flex-1 h-px bg-white/20"></span>

                                <p className="whitespace-nowrap">Secure Login</p>

                                <span className="flex-1 h-px bg-white/20"></span>

                            </div>

                            {/* Privacy */}
                            <div className="mt-6 text-center text-xs text-gray-400">
                                By continuing you agree to our{" "}
                                <span className="text-white cursor-pointer hover:underline">
                                    Privacy Policy
                                </span>
                            </div>

                        </div>



                    </motion.div>
                </div>

            }
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default LoginModal;