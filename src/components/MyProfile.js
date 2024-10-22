import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/ContractABI.json';
import CampaignDetails from './CampaignDetails';

const MyProfile = () => {


  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  // const [myCampaigns, setMyCampaigns] = useState([]);
  const [myAdd, setMyAdd] = useState();
 
  useEffect(() => {
    const fetchCampaigns = async () => {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      setMyAdd(_signer.address)
      //to change
      const contractAddress = "0x47870A4c247Df4ae8b98F29e8446529785d42F50";
      const contractInstance = new ethers.Contract(contractAddress, abi.abi, _signer);
      const response = await contractInstance.getCampaigns();
      setCampaigns(response);
     
    };

    fetchCampaigns();
  }, []);

   const allMyCampaigns = []

   const getMyCampaigns = () =>{
    for(let i=0; i<campaigns.length; i++){
      if(campaigns[i].owner === myAdd){
          allMyCampaigns.push(campaigns[i])
      }
    }
   }
  
   getMyCampaigns();

   const getDate = (d)=>{
    return new Date(parseInt(d)*1000).toLocaleDateString();
  }
  return (
    <div className='home'>
      {selectedCampaign? (
            <CampaignDetails campaign={selectedCampaign} 
                             campaigns={campaigns} 
                             onBack={() => setSelectedCampaign(null)}/>
    ): (

    <div className='hmain'>
      <h3>My Campaigns({allMyCampaigns.length})</h3>
      <hr />
      <div className='campaigns-container'>
        {campaigns.map((campaign, index) => (
          <div key={index} className='campaign-card'>
            <h4 className='inhead'>{campaign.title}</h4>
            <img src={campaign.image} alt={campaign.title} className='campaign-image' />
            <p>Deadline: {getDate(campaign.deadline)}</p>
            <p>Creator: {campaign.ownerName} </p>
            <button className='desb' onClick={() => setSelectedCampaign(campaign)}>Description</button>
            
            
          </div>
        ))}
      </div>

    </div>
    )}
    </div>
  )
}

export default MyProfile


