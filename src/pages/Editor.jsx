import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Header from '../components/Header'
import Chat from '../components/Chat'
import { FaLocationArrow } from "react-icons/fa";
import { HiCode } from "react-icons/hi";
import { PiMonitor } from "react-icons/pi";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence, time } from "framer-motion"
import Editor from "@monaco-editor/react"
import { IoIosArrowBack } from "react-icons/io";

const EditorPage = () => {

    const { id } = useParams()

    const [website, setWebsite] = useState(null)
    const [code, setCode] = useState("")
    const [message, setMessage] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [showFullPreview, setShowFullPreview] = useState(false)

    const iframeRef = useRef(null)

    // Fetch Website
    useEffect(() => {

        const handleGetWebsite = async () => {

            try {

                const result = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/website/get-by-id/${id}`,
                    { withCredentials: true }
                )

                setWebsite(result.data)
                setCode(result.data.latestCode || "")
                setMessage(result.data.conversation || [])

            } catch (error) {

                console.error(error)
                toast.error("Website fetch failed")

            }
        }
        handleGetWebsite()

    }, [id])

    // Live Preview Update
    useEffect(() => {

        if (!iframeRef.current) return

        const blob = new Blob([code], { type: "text/html" })
        const url = URL.createObjectURL(blob)

        iframeRef.current.src = url

        return () => URL.revokeObjectURL(url)

    }, [code])

    if (!website) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Loading...
            </div>
        )
    }

    return (

        <div className="min-h-screen flex bg-black text-white overflow-hidden">

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full z-50 bg-black
                w-[280px] sm:w-[320px] md:w-[390px]
                transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >

                <div className="flex justify-end p-3 md:hidden absolute right-0 px-7 py-5">
                    <button onClick={() => setSidebarOpen(false)}>
                        <FiX size={22} />
                    </button>
                </div>

                <Header
                    website={website}
                    setWebsite={setWebsite}
                    message={message}
                    setMessage={setMessage}
                    code={code}
                    setCode={setCode}
                />

                <Chat
                    website={website}
                    setWebsite={setWebsite}
                    message={message}
                    setMessage={setMessage}
                    code={code}
                    setCode={setCode}
                />

            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Editor */}
            <div className="flex-1 flex flex-col">

                {/* Top Bar */}
                <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-black/80">

                    <div className="flex items-center gap-3">

                        <button
                            className="md:hidden text-xl"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu />
                        </button>

                        {/* <Link to={'/'} className="text-sm text-zinc-400">
                            Live Preview
                        </Link> */}

                    </div>

                    <div className="flex items-center gap-3">


                        <button
                            onClick={() => setShowCode(true)}
                            className="rounded p-2 hover:bg-white/20 duration-300"
                        >
                            <HiCode />
                        </button>

                        <button onClick={() => setShowFullPreview(true)} className="rounded p-2 hover:bg-white/20 duration-300">
                            <PiMonitor />
                        </button>
                        <Link to={'/'} className="rounded p-2 hover:bg-white/20 duration-300">
                            <IoIosArrowBack />
                        </Link>

                    </div>

                </div>

                {/* Code Panel */}
                <AnimatePresence>

                    {showCode && (

                        <>

                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowCode(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
                            />


                            {/* Editor */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.35 }}
                                className="fixed top-0 right-0 h-full w-full lg:w-[45%] z-[999] bg-[#0f0f0f] border-l border-white/10 flex flex-col"
                            >

                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">

                                    <h3 className="text-sm font-semibold flex items-center gap-2">
                                        <HiCode />
                                        Source Code
                                    </h3>

                                    <button
                                        onClick={() => setShowCode(false)}
                                        className="p-1.5 hover:bg-white/10 rounded"
                                    >
                                        <FiX size={18} />
                                    </button>

                                </div>


                                {/* Monaco */}
                                <div className="flex-1">

                                    <Editor
                                        height="100%"
                                        language="html"
                                        value={code}
                                        theme="vs-dark"

                                        onChange={(value) => {
                                            setCode(value || "")
                                        }}

                                        options={{
                                            fontSize: 14,
                                            minimap: { enabled: false },
                                            wordWrap: "on",
                                            automaticLayout: true,
                                            scrollBeyondLastLine: false,
                                            readOnly: false
                                        }}

                                    />

                                </div>

                            </motion.div>

                        </>

                    )}

                </AnimatePresence>


                {/* Preview full   */}
                <AnimatePresence>
                    {showFullPreview && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
                                onClick={() => setShowFullPreview(false)}
                            />

                            {/* Full Preview */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="fixed inset-0 z-[999] bg-white flex flex-col"
                            >
                                {/* Top Bar */}
                                <div className="h-12 flex items-center justify-between px-4 bg-black text-white">
                                    <span className="text-sm">Full Preview</span>

                                    <button
                                        onClick={() => setShowFullPreview(false)}
                                        className="p-1.5 hover:bg-white/20 rounded"
                                    >
                                        <FiX size={18} />
                                    </button>
                                </div>

                                {/* Full Screen iframe */}
                                <iframe
                                    srcDoc={code}
                                    className="flex-1 w-full h-full"
                                    title="full-preview"
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>



                {/* Preview */}
                <iframe
                    ref={iframeRef}
                    className="flex-1 w-full bg-white"
                    title="preview"
                />

            </div>

            <ToastContainer position="top-right" autoClose={2000} />

        </div>

    )

}

export default EditorPage