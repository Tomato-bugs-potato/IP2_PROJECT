import React, { useEffect, useState } from 'react'
import SiteMoto from '../components/SiteMoto'
import SearchBar from '../components/SearchBar'
import ExploreCategory from '../components/ExploreCategory'
import AsosCompanies from '../components/AsosCompanies'
import WebSignup from '../components/WebSignup'
import FeaturedJobs from '../components/FeaturedJobs'
import SearchBarC from '../components/SearchBarC'
import Tailwind from '../TrainTailwind/Tailwind'
import JobCard from '../components/JobCard'
import Jobs from '../components/Jobs'
import SetupProfile from '../components/popup/SetupProfile'
import { useNavigate, useLocation } from 'react-router-dom'

export const HomePage = () => {

  const[jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const id = userData?.id;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNewUser = queryParams.get('newUser') === 'true';
  console.log(isNewUser);

  
  console.log(userData);
  
  useEffect(()=> {
    fetch("http://localhost/JobpiaSERVER/jobs.php")
      .then(result => result.json())
      .then(data => {
        setJobs(data)
    });
    if (id) {
      setIsDisplayed(true);
    }

    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange =(event) => {
    setQuery(event.target.value)
    console.log(event.target.value);
  }

 

  const SearchedJobs = (query) => {
     return jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  
  const filteredJobsData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if(query) {
      filteredJobs = SearchedJobs(query);
    }

    if(selected.length >0) {
      filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate})=> (
          jobLocation.toLowerCase() === selected.toLowerCase()  ||
          maxPrice.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) === parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() == selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          new Date(postingDate) >= new Date(selected)
      ));

    }
    return filteredJobs.map((data, i) => <JobCard key = {i} data = {data}/>);
  }

  const result = filteredJobsData(jobs,selectedCategory, query);
  const firstFiveJobs = result.slice(0, 5);

  const [isDisplayed, setIsDisplayed] = useState(false);



  const togglePopup =() => {
      setIsDisplayed(!isDisplayed);
  }
  
  return (
        <div>
        <SiteMoto />
        <SearchBar query={query} handleInputChange={handleInputChange} />
        {query && (
          <div className='w-[70%] flex justify-center lg:ml-32 lg:mt-8'>
            <Jobs result={result} />
          </div>
        )}
         <ExploreCategory />
        <FeaturedJobs result={firstFiveJobs} />
        <div>
          {isNewUser && <SetupProfile isNewUser = {isNewUser}/>}
        </div>
      </div>
  )
}
