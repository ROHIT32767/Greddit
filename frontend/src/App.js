import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// install react-router-dom , axios , bootstrap

// Components
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AuthContext from "./context/AuthContext"
import Navbar from "./components/Navbar"
import UserService from "./services/Users"
import Profile from "./components/Profile"
import MySubGreddits from "./components/MySubGreddits"
import SubGreddits from "./components/SubGreddits"
import AllSubGreddits from "./components/AllSubGreddits"

function App() {
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
      <AuthContext.Provider value={{user,setuser}}>
        <div className="container">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Register" element={!user?<Register /> : <Navigate replace to="/"/>} />
            <Route path="/Login" element={!user ? <Login /> : <Navigate replace to="/"/>} />
            <Route path="/Profile" element={user ? <Profile /> : <Navigate replace to="/" />}/>
            <Route path="/MySubGreddits" element={user ? <MySubGreddits/> :<Navigate replace to="/" />}/>
            <Route path="/SubGreddits" element={user ? <SubGreddits/> :<Navigate replace to="/" />}/>
            <Route path="/AllSubGreddits" element={user ? <AllSubGreddits/> :<Navigate replace to="/" />}/>
            <Route path="*" element={<Navigate replace to="/"/>} />
          </Routes>
        </div>
       </AuthContext.Provider>
    </Router>
  );
}

export default App; 
