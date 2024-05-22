import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultprofile from '../../../img/profileBackGround.jpg'
import ProfileEdit from '../../../pages/ProfileEdit'
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {db, storage } from '../../../firebase/firebase'
import { useAuth } from '../../../contexts/AuthProvider'
import edit from '../../../img/Category/edit.svg'
import { fetchCoverPic, uploadCoverPicture, uploadProfilePicture,fetchProfilePic } from '../../../firebase/personalProfileHandler/FirebaseFunctions'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'
import axios from 'axios';
const PersonCard = ({onUpdateProfile, profileData, isOwnProfile}) => {

    
    const useNav = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData?.id;
    const userId = id;
  
    const [userProfile, setUserProfile] = useState({
        profilePictureURL: '',
        coverPictureURL: '',

    });

    const profilePicRef = useRef(null);
    const coverPicRef = useRef(null);

    const handleProfileChange = async (e) => {
        const file = e.target.files[0];
        const response = await uploadProfilePicture(id,file); // Call PHP backend function
        if (response.success) {
            setUserProfile((prevData) => ({
                ...prevData,
                profilePictureURL: response.url,
            }));
        }
    };

    const handleCoverChange = async (e) => {
        const file = e.target.files[0];
        const response = await uploadCoverPicture(id,file); // Call PHP backend function
        if (response.success) {
            setIsModalOpen(true);
            setUserProfile((prevData) => ({
                ...prevData,
                coverPictureURL: response.url,
                
            }));
        }
    };

   
const uploadProfilePicture = async (userId, file) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profilePicture', file);

    const response = await axios.post(`http://localhost/JobpiaSERVER/profilePicture.php`, formData);
    return response.data;
};

const uploadCoverPicture = async (userId, file) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('coverPicture', file);

    const response = await axios.post('http://localhost/JobpiaSERVER/coverPicture.php', formData);
    return response.data;
};
useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get(`http://localhost/JobpiaSERVER/displayProfile.php?userId${id}`, {
          params: {
            userId: id, 
          },
        });
        
        if (response.data.success) {
          const { profilePictureURL, coverPictureURL } = response.data;
          setUserProfile({
            profilePictureURL: profilePictureURL ,
            coverPictureURL: coverPictureURL,
          });
        } else {
          console.error('Failed to fetch pictures:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };
  
    if (id) {
      fetchPictures();
    }
  }, [id]); // Trigger fetch when id changes
  
  
  const [history, setHistory] = useState([]);

  useEffect(() => {
      const fetchHistory = async () => {
          try {
              const response = await axios.get(`http://localhost/JobpiaSERVER/getProfilePictureHistory.php?userId=${id}`);
              setHistory(response.data);
          } catch (error) {
              console.error('There was an error fetching the profile picture history!', error);
          }
      };

      fetchHistory();
  }, [userId]);

   const handleClick = () => {
    useNav('/profileEdit');
    };
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    
    const handleHistoryClick = async (pictureUrl) => {
        const formData = new FormData();
        formData.append('userId', id);
        formData.append('profileUrl', pictureUrl);

        try {
            const response = await axios.post('http://localhost/JobpiaSERVER/revertProfilePicture.php', formData);
            if (response.data.success) {
                setUserProfile((prevData) => ({
                    ...prevData,
                    profilePictureURL: pictureUrl,
                }));
            } else {
                console.error('Failed to revert profile picture:', response.data.message);
            }
            return response.data;
        } catch (error) {
            console.error('An error occurred while updating profile picture:', error);
            return { success: false, message: error.message };
        }
    };
    
const CoverPhoto = () => (
      
    <div className='flex justify-end relative h-32 bg-cover bg-center w-full' style={{backgroundImage: `url(${userProfile.coverPictureURL || defaultprofile})`}}>
        <div className='p-5'>
            {isOwnProfile ? (
                  <button >
                  <div 
                      
                      onClick={() => coverPicRef.current.click()}
                      className='items-center justify-center rounded-full bg-opacity-50 hover:bg-opacity-70 transition duration-300'>
                          <div className='w-12 h-12 border border-gray-400 border-2 rounded-sm flex items-center justify-center'>
                              <img src={edit} alt="" className='w-7 h-7'/>
                          </div>
                  </div>
              </button>
            ): (<></>)}
            <input ref={coverPicRef} type="file" accept='image/*' name='coverPicture' className='hidden' onChange={handleCoverChange}/>
        </div>
    </div>
);

const ProfilePic = () => (
    <div className='absolute top-12 left-8 transform -translate-y-1.2 h-36 w-36 rounded-full overflow-hidden bg-white'>
        <div className='absolute top-2 left-2 transform -translate-y-1.2 h-32 w-32 rounded-full overflow-hidden'>
            <img src={userProfile.profilePictureURL || defaultprofile} onClick={()=> toggleModal()} alt="" className='h-full w-full object-cover'/>
            
            {isOwnProfile ? (
                 <button 
                 onClick={() => profilePicRef.current.click()}
                 className='absolute bottom-4 right-2 transform -translate-y-1.2 overflow-hidden ' >
                     <img src={edit} alt="" className='w-7 h-7 '/>
             </button>

            ) : (<></>)}
            <input type="file"  ref={profilePicRef} accept='image/*' name='profilePicture' className='hidden'  onChange={handleProfileChange}/>
            <div>
            </div>
        </div>
    </div>
);


  return (
    <div className='mx-auto max-w-screen-lg pt-10 pr-52 pl-32 h-[400px] '>
        <div className='relative h-cover border border-gray-300 rounded-sm shadow-inside'>
            <CoverPhoto/>
        <ProfilePic></ProfilePic>
        
        <div className='flex flex col justify-between pr-12'>
            <div className=' p-5'>
                <h1 className='font-bold text-2xl capitalize ml-2 pl-36'>{profileData.name}</h1>
                <div className='text-normal text-gray-600 mt-1 pl-36'>
                <div><p >{profileData.jobName} at<span className='text-black'> {profileData.currJobLocation}</span></p></div>
                <div className='flex mt-2'><p className='flex'><span className='mr-2 mt-1'><FaMapMarkerAlt/></span><span className='mt-0'>{profileData.location}</span></p></div>
            </div> 
            <div className='flex pl-20 pl-10 pt-5'><FaQuoteLeft/>{profileData.bio}<FaQuoteRight/></div>
            </div>
            {isOwnProfile ? (
            <div className=''>
                <button onClick={handleClick}  className='py-2 px-7 border border-blue border-1 rounded-sm text-blue font-semibold mt-8 cursor-pointer'>Edit Profile</button>
            </div>
            ) : (
                <></>
            )}
        </div> 
       </div>
       {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-gray-700 p-8 rounded shadow-lg relative'>
                        <button onClick={toggleModal} className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'>
                            &times;
                        </button>
                        <div className="flex p-3 ">
                    {history.map((picture, index) => (
                        <img
                            key={index}
                            width={150}
                            src={picture.profilePicture}
                            alt={`Profile history ${index}`}
                            onClick={() => handleHistoryClick(picture.profilePicture)}
                            style={{ cursor: 'pointer' }}
                            className='m-4'
                        />
                    ))}
                </div>
                    </div>
                </div>
            )}
       
    </div>
  )
}

export default PersonCard