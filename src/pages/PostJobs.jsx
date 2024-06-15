import React, { useState } from 'react'
import {useForm} from 'react-hook-form' 
import CreatableSelect from 'react-select/creatable'
import { useNavigate } from 'react-router-dom'

const PostJobs = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCatag, setSelectedCatag] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const id = userData?.id;


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
        const response = await fetch('http://localhost/JobpiaSERVER/postJob.php', {
            method: 'POST',
            body: formData,
        });

        if(response.ok) {
            const data = await response.text();
            window.alert('Job posted successfully.');
            console.log("Form Submitted Successfully:", data);
        } else {
            console.log("Failed to submit form:", response.statusText);
        }
    } catch(error) {
        console.error('Error submitting form: ', error);
    }  
};


  const skillOptions = [
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Mysql", label: "Mysql" },
  ];

  const catagOptions = [
    { value: 'design', label: 'Designing' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'technology', label: 'Technology' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'human resources', label: 'Human Resources' },
    { value: 'business', label: 'Business' }
  ];

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-10 flex justify-center'>
      <div className='bg-bar py-10 px-4 lg:px-16 w-[80%] rounded:sm'>
      <div className='flex justify-center lg:text-4xl sm:text-2xl md:text-3xl font-bold mx-auto mb-8'><h1 className=''>Post Job</h1></div>
        <form onSubmit={handleSubmit} enctype="multipart/form-data" className='space-y-5'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <input type="number" className='hidden' value={id} name='userId'/>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Title</label>
              <input type="text" placeholder='Enter Job title' name='jobTitle' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Company Name</label>
              <input type="text" placeholder='Enter the company name' name='companyName' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Minimum Salary</label>
              <input type="num" placeholder='$10k' name='minPrice' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>maximum Salary</label>
              <input type="text" placeholder='$100k' name='maxPrice' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Salary Type</label>
              <select  name='salaryType' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'>
                  <option value="">Choose Your Salary Type</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Montly</option>
                  <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Location</label>
              <input type="text" placeholder='Addis Abeba'  name='jobLocation' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Posting Date</label>
              <input type="date"  name='postingDate' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
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
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Required Skill Sets</label>
              <CreatableSelect
              className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6' 
                  defaultValue={selectedSkill} 
                  onChange={setSelectedSkill} 
                  options = {skillOptions} 
                  isMulti
                
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Company Logo</label>
              <input type="file" placeholder='https://wetransfer.com/ ....'  name='companyLogo' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Employment Type</label>
              <select name='employmentType' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'>
                  <option value="">Choose Your Employment Type</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Type</label>
              <CreatableSelect
              className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6' 
                  defaultValue={catagOptions} 
                  onChange={setSelectedCatag} 
                  options = {catagOptions} 
                  name='jobType'
                  
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Description</label>
              <textarea className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                      name='description' rows={6}
                  placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.">
              </textarea>
            </div>
          </div>
          
          <input className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='submit'/>
        </form>
      </div>
    </div>
  )
}

export default PostJobs