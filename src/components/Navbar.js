import React, { useContext } from 'react';
import '../App.css'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import {ConnectionContext} from './ConnectionContext';
const Navbar = () => {
  const {connected, setConnected} = useContext(ConnectionContext); 
  const [currentAdd, setCurrentAdd] = useState();
  const connectMetamask = async() => {
      if(window.ethereum){
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const address = await signer.getAddress();
        setCurrentAdd(address);
        setConnected(true);
        console.log("connected to ", address);
      }
      else{
        console.log("install metamask");
      }
  }

   // Listen for account changes
 useEffect(() => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        setConnected(false);
        setCurrentAdd('');
      } else if (accounts[0] !== currentAdd) {
        // User has switched accounts
        setConnected(true);
        setCurrentAdd(accounts[0]);
      }
    });
  }

  // Cleanup function to remove the event listener when the component unmounts
  return () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.removeListener('accountsChanged', setCurrentAdd);
    }
  };
}, [setConnected, currentAdd]); // Depend on currentAddress to re-run the effect if it changes



  return (
    <div className="navbar">
      <div className='mainhead'>Make funding easy</div>
      {connected && <div>Logged in as: <span className='add'>{currentAdd}</span></div>}
      <div className="navbar-right">
        <input type="text" className="search-bar" placeholder="Search..." />
        {/* <button className="connect-btn">Search</button> */}
        <button className="connect-btn" onClick={connectMetamask}>Connect</button>
        
      </div>
    </div>
 );
}

export default Navbar;
