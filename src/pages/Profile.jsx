import React, { useState, useEffect } from 'react'
import PersonCard from '../components/Profile/cards/PersonCard'
import AboutPerson from '../components/Profile/cards/AboutPerson'
import Experiences from '../components/Profile/cards/Experiences'
import Educations from '../components/Profile/cards/Educations'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const [profileData, setProfiledata] = useState({});
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const { id } = useParams(); 
  const newId = id || userData?.id;
  const isOwnProfile = !id;
  

  const handleProfileUpdate = (updatedProfile) => {
      setProfiledata(updatedProfile);
  };

  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost/JobpiaSERVER/profile.php?userId=${newId}`);
        if (response.ok) {
          const profileData = await response.json();
          setProfiledata(profileData);
        } else {
          console.log("Failed to fetch profile data");
        }
      } catch (error) {
        console.error('Error fetching profile data: ', error);
      }
    };
  
    fetchProfileData();
  }, [id]); 

  const handlePrint = () => {
    const printContents = document.getElementById('printableArea').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className='flex h-[800px]'>
       <div className='flex-1 h-screen'>
         <div className=''>
          <div className='flex justify-between'>
          <div className='pt-7 text-4xl m-6 pl-36 pr-12 font-semibold'>
              MyProfile
            </div>
           {!isOwnProfile ? (
             <div className='p-10'>
             <button onClick={handlePrint} className='py-2 px-5 border border-solid-2 border-gray-400 rounded:sm text-blue font-bold text-xl'>Print User Profile</button>
           </div>    
           ) : (<></>)}
          </div>
            <div id='printableArea'>
            <hr className='' />
            <PersonCard onUpdateProfile= {handleProfileUpdate} profileData={profileData} isOwnProfile = {isOwnProfile}/>
            <AboutPerson  profileData={profileData} isOwnProfile = {isOwnProfile}/>   
            <Experiences profileData={profileData} isOwnProfile = {isOwnProfile}/>
            <Educations profileData={profileData} isOwnProfile = {isOwnProfile}/>
            </div>
         </div> 
      </div>
    </div>
  )
}

export default Profile