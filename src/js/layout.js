import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Contact from './components/contact';
import Search from './components/search';
import Signup from './components/signup';
import Login from './components/login';
import SingleCity from './components/single-city';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:id" element={<SingleCity />} />
        </Routes>
      </BrowserRouter>
  );
};

export default Layout;
