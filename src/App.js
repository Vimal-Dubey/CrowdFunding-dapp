import React from 'react';
import { ConnectionProvider } from './components/ConnectionContext';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CreateCampaign from './components/CreateCampaign';
import Layout from './components/Layout';
import MyProfile from './components/MyProfile';

function App() {
 return (
    <ConnectionProvider>
      <div className='cmp'>
        <div className='navbar'>
          <Navbar />
        </div>
       <div className='slidebar'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="create-campaign" element={<CreateCampaign />} />
                <Route path="My-Profile" element={<MyProfile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
    </ConnectionProvider>
 );
}

export default App;
