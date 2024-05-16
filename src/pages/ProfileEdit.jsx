import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import {uploadPortfolio } from '../firebase/personalProfileHandler/FirebaseFunctions'
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const id = userData?.id;
 
  const [formData, setFormData] = useState({
    userId: id,
    fullName: '',
    email: '',
    jobName: '',
    location: '',
    bio: '',
    phone: '',
    currJobLocation: '',
    aboutMe: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('http://localhost/JobpiaSERVER/updateProfile.php', {
            method: 'POST',
            body: formData,
        });

        if(response.ok) {
            const data = await response.text();
            console.log("Form Submitted Successfully:", data);
        } else {
            console.log("Failed to submit form:", response.statusText);
        }
    } catch(error) {
        console.error('Error submitting form: ', error);
    }  
};






    return (
      <div className='max-w-screen-2xl container w-full xl:px-2 px-4 py-10 flex justify-center'>
        <div className='bg-white py-10 px-4 lg:px-10 w-[90%] rounded:sm shadow-custom'>
        <div className='flex justify-between mx-auto mb-5   border-b-2'>
        </div >
              <form onSubmit={handleSubmit} className='space-y-5 '>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <input type="number"  name='userId' value={id} className='hidden' />
                <label className='block mb-2 text-lg font-semibold'>Full Name</label>
                <input type="text" name='name'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Email Address</label>
                <input type="email" name='email'  placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Job Name</label>
                <input type="text" name='jobName'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Location</label>
                <input type="text" name='location'  placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-full w-full'>
                <label className='block mb-2 text-lg font-semibold'>Personal Bio</label>
                <input type="text" name='bio'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-3 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Phone Number</label>
                <input type="text" name='phone'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Current Job Location</label>
                <input type="text" name='currJobLocation'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-3 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
              <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
                <div className='lg:w-full w-full'>
                  <label className='block mb-2 text-lg font-semibold'>About Me</label>
                  <textarea name='aboutMe'  className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                        rows={6}
                      placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
                  </textarea>
                </div>
              </div>
              <div className='flex justify-end'>
                  <input className='block mt-12 px-7 py-2 bg-blue  text-white text-white rounded:sm cursor-pointer' type='submit' />
              </div>
            </form>
          </div>
      </div>
  )
}

export default ProfileEdit