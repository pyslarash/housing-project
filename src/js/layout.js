import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Contact from './components/contact';
import Search from './components/search';
import Signup from './components/signup';
import Login from './components/login';
import SingleCity from './components/single-city';
import NotFound from './notfound';
import About from './components/about';
import Profile from './components/profile';
import EditProfile from './components/edit_profile';
import Favorites from './components/favorites';
import { setToken, setTokenTime, setLoggedIn, setUsername, setPassword } from "./store/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BD_URL;

function UseTokenExpiration() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const expirationTime = useSelector(state => state.user.tokenTime);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    function checkTokenExpiration() {
      if (!token || !expirationTime) {
        // Token or expiration time is not present, so the user is not logged in
        dispatch(setLoggedIn(false));
        return false;
      }
      const currentTime = new Date().toLocaleString("en-US", { timeZone: "UTC" }); // get the current time in UTC timezone
      const currentUnixTime = Date.parse(currentTime); // get the current time in Unix timestamp in milliseconds
      const expirationUnixTime = expirationTime; // convert the expiration time to UTC time zone and get its Unix timestamp in milliseconds
      const timeDifference = expirationUnixTime - currentUnixTime; // calculate the time difference between the expiration time and the current time
      if (timeDifference > 5000) {
        dispatch(setLoggedIn(true));
      } else {
        dispatch(setLoggedIn(false));
        handleLogout();
        navigate('/login');
        alert('Your session has expired. Please log in again.');
        return true;
      }
    }

    if (token && expirationTime) {
      const intervalId = setInterval(() => {
        checkTokenExpiration();
      }, 1000);

      if (loggedIn === false) { 
        alert('Your time is up. Please, log in again!');
      }

      // clear the interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [dispatch, token, expirationTime]);

  const username = useSelector(state => state.user.username);
  const password = useSelector(state => state.user.password);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {
        username,
        password,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
  
      // clear the user's access token from the state
      console.log("Calling handleLogout!")
      dispatch(setToken(null));
      dispatch(setLoggedIn(false));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // token has expired, clear the token and set user as logged out
        dispatch(setToken(null));
        dispatch(setLoggedIn(false));
      } else {
        console.log(error);
      }
    }
  };
  

  return null;
}

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <UseTokenExpiration />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/favorites" element={<Favorites />} />
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:id" element={<SingleCity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
