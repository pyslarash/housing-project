import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Contact from './components/contact';
import Search from './components/search';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </BrowserRouter>
  );
};

export default Layout;
