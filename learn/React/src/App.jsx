import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom"
import Home from "./page/Home"
import Login from "./page/Login"
import Register from "./page/Register"
import "./App.css"

const ProtectedRouter = ({children}) => {
    const token = localStorage.getItem("token")
    if (!token)
        return <Navigate to="/login" />
    return children
}
const App = () =>{

	return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Navigate to="/login" replace />}></Route>
                <Route path="/home"  element={
                  <ProtectedRouter>
                          <Home />
                  </ProtectedRouter>
                }></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
	)
}
export default App
