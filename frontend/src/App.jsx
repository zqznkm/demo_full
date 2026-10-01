import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Login from "./components/Login"
import Register from "./components/Register.jsx"
import Header from "./components/Header.jsx"


function App() {

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )

}

export default App
