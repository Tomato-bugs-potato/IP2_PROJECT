import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FiCalendar, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';
const jobCard = ({data}) => {

  const {_id,companyName,companyLogo, jobTitle,minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate,description} = data;
  

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  


  return (
    <div>
      <section className='flex justify-between m-3 border border-gray-300 shadow-custom p-4 cursor-pointer'>
        <Link to={"/"} className="flex gap-4 flex-col sm:flex-row items-start">
            <img src={`http://localhost/JobpiaSERVER/${companyLogo}`} alt="" className='w-24 h-20'/>
            <div>
                <h4 className='text-primary mb-1 ml-2'>{companyName}</h4>
                <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
                <div className='text-gray-700 text-base flex flex-wrap gap-2 mb-2'>
                  <span className='flex items-center gap-2'><FiMapPin/>{jobLocation}</span>
                  <span className='flex items-center gap-2'><FiClock/>{employmentType}</span>
                  <span className='flex items-center gap-2'><FiDollarSign/>{minPrice}-{maxPrice}k</span>
                  <span className='flex items-center gap-2'><FiCalendar/>{postingDate}</span>
                </div>
                <div style ={{ textAlign: 'justify',}}>
                <p className='text-gray-700'>{description}</p>
                </div>
            </div>
            
        </Link>
            <div>
              <button className='py-1.5 px-5 mt-4 border border-solid-5 rounded:sm text-white bg-blue font-bold justify-end'>
              <Link 
                  to={{ 
                    pathname: `/jobs/${data._id}/apply`,
                    state: { jobId: data._id }  // Pass _id in state object
                  }}
                >
                  Apply
                </Link>
              </button> 
            </div>
      </section>
    </div>
  )
}

export default jobCard