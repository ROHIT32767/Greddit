import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import Home from './components/Home';
import Navbar from "./components/Navbar"
import UserService from "./services/Users"
import Profile from "./components/Profile"
import MySubGreddits from "./components/MySubGreddits"
// import SubGreddits from "./components/SubGreddits"
// import AllSubGreddits from "./components/AllSubGreddits"

export default function App() {
  const [user, setuser] = React.useState(null)
  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      UserService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      {/* <AuthContext.Provider value={{user,setuser}}> */}
      <div className="container">
        <Navbar user={user} setuser={setuser} />
        <Routes>
          <Route exact path="/" element={<Home user={user} setuser={setuser} />} />
          <Route path="/profile" element={window.localStorage.getItem('token') ? <Profile user={user} setuser={setuser} /> : <Navigate replace to="/" />} />
          <Route path="/MySubGreddits" element={window.localStorage.getItem('token') ? <MySubGreddits user={user} setuser={setuser} /> : <Navigate replace to="/profile" />} />
          {/* <Route path="/SubGreddits" element={window.localStorage.getItem('token') ? <SubGreddits/> :<Navigate replace to="/" />}/>
            <Route path="/AllSubGreddits" element={window.localStorage.getItem('token') ? <AllSubGreddits/> :<Navigate replace to="/" />}/>
            <Route path="*" element={<Navigate replace to="/"/>} /> */}
        </Routes>
      </div>
      {/* </AuthContext.Provider> */}
    </Router>
  );
}
