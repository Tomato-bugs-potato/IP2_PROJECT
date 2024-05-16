import React from 'react'
import { useState } from 'react';
const LoginDetails = () => {

  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const id = userData?.id;
  const Useremail = userData?.email;
 

  const handleEmailSubmit = async () => {

    try {
        const response = await fetch(`http://localhost/JobpiaSERVER/updateEmail.php?userId=${id}`, {
            method: 'POST',
            body: JSON.stringify({email}),
        });

        if(response.ok) {
            const data = await response.text();
            console.log("Form Submitted Successfully:", data);
            alert("Email updated successfully");
        } else {
            console.log("Failed to submit form:", response.statusText);
        }
    } catch(error) {
        console.error('Error submitting form: ', error);
    }  
};



const handlePasswordSubmit = async () => {

    try {
        const response = await fetch(`http://localhost/JobpiaSERVER/changePassword.php?userId=${id}`, {
            method: 'POST',
            body: JSON.stringify({oldPassword,newPassword}),
        });

        if(response.ok) {
            const data = await response.text();
            console.log("Form Submitted Successfully:", data);
            alert("Password changed successfully");
        } else {
            console.log("Failed to submit form:", response.statusText);
        }
    } catch(error) {
        console.error('Error submitting form: ', error);
    }  
};

  return (
    <div className='flex flex-col'>
        <div className='p-5 border-b-2'>
            <h1 className='font-bold text-xl'>Basic Information</h1>
            <p className='p-3'>This is login information that you can update anytime</p>
        </div>
        <div>
                <div className='grid grid-cols-3 border-b-2 m-3'>
                    <div className='p-5'>
                        <h1 className='font-bold'>Update Email</h1>
                        <p className='text-gray-600'>Update your email address to make sure it is safe</p>
                    </div>
                    <div>
                        <div className='p-5'>
                            <input type="email" name='email'  value={Useremail}  placeholder='Enter your name' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                            focus:outline-none sm:text-sm sm:leading-6'/>
                        </div>
                        <div className='flex flex-col pl-8 mb-6'>
                            <h1 className='font-bold'  >Update Email</h1>
                            <input type="email" name='email' onChange={(e) => setEmail(e.target.value)}  placeholder='Enter your email' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
                            focus:outline-none sm:text-sm sm:leading-6 border border-gray-300 rounded-sm mt-2'/>
                            <div><button onClick={handleEmailSubmit} className='text-white font-bold bg-blue px-5 py-2.5 rounded-sm mt-3'>Update Email</button></div>
                        </div> 
                    </div>
                </div>
                <div className='grid grid-cols-3 ml-3'>
                    <div className='p-5'>
                        <h1 className='font-bold'>New Password</h1>
                        <p className='text-gray-600'>Manage your password to make sure it is safe</p>
                    </div>
                    <div className='ml-6'>
                        <div className='flex flex-col p-5'>
                        <h1 className='font-bold'>Old Password</h1>
                            <input type="text" name='oldPassword' onChange={(e) => setOldPassword(e.target.value)}  placeholder='Enter your email' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-6 text-gray-800 placeholder:text-grey-400
                            focus:outline-none sm:text-sm sm:leading-6 border border-gray-300 rounded-sm mt-2'/>
                            <p className='text-gray-500'>Minimum 8 characters</p>
                        </div>
                        <div className='flex flex-col pl-5 w-full'>
                            <h1 className='font-bold'>New Password</h1>
                            <input type="text" name='newPassword'  onChange={(e) => setNewPassword(e.target.value)}  placeholder='Enter your email' className='block w-full  flex-1 border-1 bg-white py-1.5 pl-6 text-gray-800 placeholder:text-grey-400
                            focus:outline-none sm:text-sm sm:leading-6 border border-gray-300 rounded-sm mt-2'/>
                            <p className='text-gray-500'>Minimum 8 characters</p>
                            <div><button onClick={handlePasswordSubmit} className='flex items-left text-white font-bold bg-blue px-4 py-2.5 mt-3'>Change Password</button></div>
                        </div> 
                    </div>
                </div>
        </div>
    </div>
  )
}

export default LoginDetails