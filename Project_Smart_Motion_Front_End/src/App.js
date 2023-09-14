import React, { useState, useEffect} from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/AuthService";
import AuthVerify from "./common/AuthVerify";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Sensor from "./components/Sensor";
import AddSensor from "./components/AddSensor";
import SensorList from "./components/SensorList";



const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Smart Motion
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <>
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Sensor
              </Link>
              </li>
              <li className="nav-item">
              <Link to={"/sensors"} className="nav-link">
                Sensor
              </Link>
              </li>
            </>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={ currentUser ? (<Navigate to="/dashboard" state={{ from: '/login'}}/>) : <Login/> } />
          <Route path="/register" element={ currentUser ? (<Navigate to="/dashboard" state={{ from: '/register'}}/>) : <Register/> } />
          <Route path="/profile" element={ currentUser ? <Profile/> : (<Navigate to="/login" state={{ from: '/profile'}} />) } />
          <Route path="/dashboard" element={ currentUser ? <Dashboard/> : (<Navigate to="/login" state={{ from: '/dashboard'}} />) } />
          <Route path="/mod" element={ currentUser ? <BoardModerator/> : (<Navigate to="/login" state={{ from: '/mod'}} />) } />
          <Route path="/admin" element={ currentUser ? <BoardAdmin/> : (<Navigate to="/login" state={{ from: '/admin'}} />) } />
          <Route path="/sensors" element={ currentUser ? <SensorList/> : (<Navigate to="/login" state={{ from: '/sensors'}} />) } />
          <Route path="/add" element={ currentUser ? <AddSensor/> : (<Navigate to="/login" state={{ from: '/add'}} />) } />
          <Route path="/sensors/:uid" element={ currentUser ? <Sensor/> : (<Navigate to="/login" state={{ from: '/sensors/:uid'}} />) } />
        </Routes>
      </div>

      <AuthVerify logOut={logOut}/>
    </div>
  );
};

export default App;
