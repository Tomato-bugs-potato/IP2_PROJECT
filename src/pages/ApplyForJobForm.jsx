import React, { useState } from 'react';
import {useForm} from 'react-hook-form' 
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ApplyForJobForm() {
      const navigate = useNavigate();
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const id = userData?.id;
      const { _id } = useParams();
      
   
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
        const response = await fetch(`http://localhost/JobpiaSERVER/applyJob.php?jobId=${_id}`, {
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
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-10 flex justify-center'>
        <div className='bg-bar py-10 px-4 lg:px-16 w-[80%] rounded:sm'>
        <div className='flex justify-center lg:text-4xl sm:text-2xl md:text-3xl font-bold mx-auto mb-8'><h1 className=''>Apply For Job</h1></div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <input type="number" name='user_id' value={id}/>
                <input type="number" name='job_posting_id' value={_id}/>
                <label className='block mb-2 text-lg font-semibold'>Full Name</label>
                <input type="text" placeholder='Enter Job title' name='fullName' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Current Employment</label>
                <input type="text" placeholder='Enter the company name'  name='currEmployment' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Email</label>
                <input type="email" placeholder='$10k' name='email' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Phone Number</label>
                <input type="text" placeholder='$100k' name='phone' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Personal Description</label>
                <input type="text"  name='description' placeholder='Addis Abeba' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Application Date</label>
                <input type="date"  name='applicationDate' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Experience Level</label>
                <select name='experienceLevel' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'>
                    <option value="">Choose Your Experience Level</option>
                    <option value="Any experience">Any experience</option>
                    <option value="Internship">Internship</option>
                    <option value="Work remotely">Work remotely</option>
                </select>
              </div>
            </div>    
            <input className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='submit'/>
          </form>
        </div>
      </div>    
      );
}

export default ApplyForJobForm
