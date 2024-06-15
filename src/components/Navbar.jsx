import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark} from "react-icons/fa6";
import AllJobs from '../pages/AllJobs';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [userProfile, setUserProfile] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData?.id;
    const { userLoggedIn, logout} = useAuth();
    const handleMenuToggler = () => {
        setMenuOpen(!isMenuOpen)
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
  }, [id]); 


    const handleLogout = async() => {
       logout()
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('userData');
    
      }

      
    const navbarItems = [
        {path: "/", title: "Home"},
        {path: "/allJobs", title: "All Jobs"},
        {path: "/postJobs", title: "Post Jobs"},
        {path: "/sidebarProfile", title: "Profile"},

    ];
  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-20 px-4'>
        <nav className='flex justify-between items-center py-6'>
            <a href="" className='font-barrio text-blue text-5xl font-bold justify-left'>JoPia</a>
            <ul className='hidden md:flex gap-12'>
                {
                    navbarItems.map(({path, title})=>(
                        <li key={path} className='text-base text-primary'>
                            <NavLink
                                to = {path}
                                className = {({isActive}) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <div className='text-base text-primary font-medium space-x-1 hidden lg:block mr-0'>
                {   userLoggedIn ? (
                    <div className='flex gap-4'>
                        <div>
                            <button onClick={handleLogout} className='text-white py-2 px-4 mt-1 bg-blue border rounded '>Sign Out</button>
                        </div>
                        <div>
                            <Link to={"/sidebarProfile"}><img src={`http://localhost/JobpiaSERVER/${userProfile.profilePictureURL}`} alt="" className='w-12 h-12 rounded-full cursor-pointer'/></Link>
                        </div>
                    </div>
                    
                ) : (
                    <>
                        <Link to="/login" className='text-blue py-2 px-5 font-normal'>Log in</Link>
                        <Link to = "/sign-up" className='text-white py-2 px-5 bg-blue border rounded'>Sign Up</Link>
                    </>
                )

                }    
            </div>

            <div className='md:hidden block'>
                <button onClick={handleMenuToggler}>
                    {
                        isMenuOpen ? <FaXmark/> : <FaBarsStaggered className='w-6 h-6 text-primary'/>

                    }
                </button>
            </div>
        </nav>

        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "":"hidden"}`}>
        <ul>
                {
                    navbarItems.map(({path, title})=>(
                        <li key={path} className='text-base text-white py-1'>
                            <NavLink
                                to = {path}
                                className = {({isActive}) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))
                }
                <li className='text-white py-1'><Link to="/login" >Log in</Link></li>
            </ul>
        </div>
    </header>
  )
}

export default Navbar