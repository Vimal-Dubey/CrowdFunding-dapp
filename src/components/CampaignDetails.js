import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/ContractABI.json';

const CampaignDetails = ({ campaign, campaigns,onBack }) => {
 const [donationAmount, setDonationAmount] = useState('');
 const [donors, setDonors] = useState([]);
 const [donations, setDonations] = useState([]);
 const contractAddress = "0x47870A4c247Df4ae8b98F29e8446529785d42F50";

   // Function to parse the donation amount into Wei
 const parseDonationAmount = (amount) => {
  try {
    const amountInWei = ethers.parseEther(amount);
    return amountInWei;
  } catch (error) {
    console.error("Error parsing donation amount:", error);
    alert("Invalid donation amount. Please enter a valid number.");
    return null; // Return null or an appropriate value to indicate parsing failure
  }
}; 

const findCampaignAddress = () => {
  // Iterate over the campaigns array
  for (let i = 0; i < campaigns.length; i++) {
     // Check if the current campaign matches the given campaign
     if (campaigns[i] === campaign) {
       // Return the address of the matching campaign
       return i;
     }
  }
  // If no matching campaign is found, return null or an appropriate value
  return null;
 };

 const fetchDonorsAndDonations = async () => {
  const _provider = new ethers.BrowserProvider(window.ethereum);
  const _signer = await _provider.getSigner();
  const contractInstance = new ethers.Contract(contractAddress, abi.abi, _signer);
  const cid = findCampaignAddress();

  if (cid !== null) {
    const [donors, donations] = await contractInstance.getDonators(cid);
    setDonors(donors);
    setDonations(donations);
  }
};
fetchDonorsAndDonations()

  
 const Donate = async () => {
  console.log("donate called!")
  const amountInWei = parseDonationAmount(donationAmount);
  
  try{  
  const _provider = new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, abi.abi, _signer);
    const cid = findCampaignAddress();

    console.log(`before tx! at index `,cid)
   
    const tx = await contractInstance.donateToCampaign(cid, { value: amountInWei });
    console.log("After tx!")
    await tx.wait(); // Wait for the transaction to be mined

    alert("Donation successful!");
    // Optionally, update the UI to reflect the new donation amount
  }
  catch(error){
    console.error("error donating: ",error);
    alert("Error occured while donating");
  }
 };

 return (
    <div className='campD'>
      <div>
        <h2>{campaign.title}</h2>
        <button onClick={onBack} className='bckc'>Back to Campaigns</button>
      </div>
      <hr />
      <div className='campContainer'>
        <img src={campaign.image} alt={campaign.title} />
        <div className='right'>
          <h4>Created By: {campaign.ownerName}</h4>
          <p>Total amount collected: {ethers.formatEther(campaign.amountCollected)}</p>
          <p>Target: {ethers.formatEther(campaign.target)}</p>
          <p className='stry'>{campaign.description}</p>
          <input
            type="number"
            placeholder="Enter donation amount in ETH"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
          <button className='dnt' onClick={Donate}>Donate</button>
          {/* ---------- */}
          <div className='donorsContainer'>
        <h3>Donors:</h3>
        <table>
          <thead>
            <tr>
              <th>Donor</th>
              <th>Donation</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index}>
                <td>{donor}</td>
                <td>{ethers.formatEther(donations[index])} ETH</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
        {/* ---------- */}
        </div>
      </div>
   
 );
};

export default CampaignDetails;
