import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Login from "./components/Login"
import Register from "./components/Register.jsx"
import Header from "./components/Header.jsx"
import ApplicationsForm from "./components/ApplicationsForm.jsx"
import Applications from "./components/Applications.jsx"
import AdminPanel from "./components/AdminPanel.jsx"

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
            <Route path="/ApplicationsForm" element={<ApplicationsForm />} />
            <Route path="/Applications" element={<Applications />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )

}

export default App
