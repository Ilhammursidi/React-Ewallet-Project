import { Route, Routes } from "react-router"
import LandingPage from "../src/Pages/LandingPage"
import Login from "./Pages/Auth/Login"
import { ForgotPassword } from "./Pages/Auth/ForgotPassword"
import { EnterPin } from "./Pages/Auth/EnterPin"
import SignUp from "./Pages/Auth/SignUp"
import { Dashboard } from "./Pages/Dashboard/Dashboard"

function AppRouter() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
    <Route path="/enter-pin" element={<EnterPin/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  )
}

export default AppRouter