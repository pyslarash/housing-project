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

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <BrowserRouter basename={basename}>
      <Navbar />
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
