import React, {useState} from 'react'
import pr from '../../img/pr.jpg'
import { useNavigate } from 'react-router-dom';

const ExperiencePopup = ({handleSubmit,onClose}) => {
    
    const [isOpen, setIsOpen] = useState(true);
    const useNav = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData?.id;
 


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[850px] bg-white p-6 rounded-sm'>
            <div className='flex justify-end'><button className='text-red-600 text-xl place-self-end font-bold mr-3' onClick={onClose}>X</button></div>
            <form onSubmit={handleSubmit} className='space-y-5 '>
                <h1 className='justify-center items-center font-bold'>Update Your Education Status</h1>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <input type="number"  name='userId' value={id}  className='hidden'/>
                <label className='block mb-2 text-lg font-semibold'>Job Name</label>
                <input type="text" name='jobName'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Job Location</label>
                <input type="text" name='jobLocation'  placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Job Type</label>
                <input type="text" name='jobType'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Start Year</label>
                <input type="date" name='startYear'  placeholder='Enter the company name'  className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>End Year</label>
                <input type="date" name='endYear'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-3 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6'/>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg font-semibold'>Description</label>
                <textarea type="text" name='description'   placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                focus:outline-none sm:text-sm sm:leading-6' rows={3}/>
              </div>
            </div>
            <button type='submit' className='py-4 px-2 bg-blue text-white font-bold rounded-sm justify-right'>submit</button>
        </form>
        </div>
    </div>
  )
}

export default ExperiencePopup