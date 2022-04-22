import Navbar from "./components/Navbar"
import Home from "./pages/NearestPlace"
import "./App.css"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import PlacesContext from "./utils/PlacesContext"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { toast, ToastContainer } from "react-toastify"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import NearestPlace from "./pages/NearestPlace"

function App() {
  const navigate = useNavigate()

  const signup = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        avatar: form.elements.avatar.value,
      }

      await axios.post("http://localhost:5000/api/auth/signup", userBody)
      console.log("signup success")
      toast.success("user created")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        email: form.elements.email.value,
        password: form.elements.password.value,
      }

      const response = await axios.post("http://localhost:5000/api/auth/login", userBody)

      const token = response.data
      localStorage.tokenPlaces = token
      console.log("login success")

      navigate("/")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem("tokenPlaces")
    console.log("logout success")
  }

  const forgotPassword = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        email: form.elements.email.value,
      }
      await axios.post("http://localhost:5000/api/auth/forgot-password", userBody)
      toast.success("password resent link is sent, go check your email")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const resetPassword = async (e, token) => {
    e.preventDefault()
    try {
      const form = e.target
      const password = form.elements.password.value
      const passwordConfirmation = form.elements.passwordConfirmation.value
      if (password !== passwordConfirmation) return toast.error("password is not matching")

      const userBody = {
        password,
      }
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, userBody)
      toast.success("password reset")
      navigate("/login")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const store = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
  }
  return (
    <PlacesContext.Provider value={store}>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<NearestPlace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </PlacesContext.Provider>
  )
}

export default App
