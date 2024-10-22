import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import CreateCampaign from './CreateCampaign';
import Layout from './Layout';
import MyProfile from './MyProfile';
const Slidebar = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Use index for the default route */}
          <Route path="create-campaign" element={<CreateCampaign />} /> {/* Corrected path */}
          <Route path="My-Profile" element={<MyProfile />} /> {/* Corrected path */}
        </Route>
      </Routes>
    </BrowserRouter>
 )
}

export default Slidebar;
