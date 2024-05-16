import React from 'react'
import { useState,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfileEdit from '../pages/ProfileEdit';
import LoginDetails from '../components/LoginDetails';


const Settings = () => {

  
  const [activeMenuItem, setActiveMenuItem] = useState("Update Profile");

  const handleMenuItemCheck = (title, path, event)=> {
    if(title === "Update Profile" || title === "Login Details") {
      event.preventDefault();
    }
    setActiveMenuItem(title);
  };

  const MenuItems = [
    {title: "Update Profile", path: "/"},
    {title: "Login Details", path: "/"}
  ]

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 rounded:md mt-10'>
         <div className='pt-24 text-4xl m-6 pl-36 pr-12 font-semibold'>
              Settings
            </div>
            <div>
         </div>
         <hr className=''/>
         <div>
          <ul className='flex flex-row p-4 mr-5'>
            {MenuItems.map(({path, title})=> (
              <li className='mr-5 font-bold text-xl text-gray-400'>
                <NavLink to={path} className={`${activeMenuItem === title ? 'text-red-600': ''}`} onClick = {(event)=>handleMenuItemCheck(title, path, event)}>
                  <span>{title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <hr className=''/>
        <div className='flex-grow'>
          {activeMenuItem === 'Update Profile' && <ProfileEdit/>}
          {activeMenuItem === 'Login Details' &&  <LoginDetails/> }
        </div>
    </div>
  )
}

export default Settings