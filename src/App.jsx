import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home'
import Footer from './pages/Footer'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import NotFound from './pages/NotFound'
import Editor from './pages/Editor'


const App = () => {
  useGetCurrentUser()
  const { userData } = useSelector(state => state.user)


  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={userData ? <Dashboard /> : <Home />} />
          <Route path='/generate' element={userData ? <Generate /> : <Home />} />
          <Route path='/editor/:id' element={userData ? <Editor /> : <Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
