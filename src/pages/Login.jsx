import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {login} = useAuth();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post("http://localhost/JobpiaSERVER/login.php", {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status === "success") {
                login();
              sessionStorage.setItem("loggedIn", true);
              sessionStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
    
              navigate('/');
            } else {
              setErrorMessage(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <div>
            <header className='max-w-screen-2xl container mx-auto xl:px-20 px-4'>
                <nav className='flex justify-between items-center py-16'>
                    <a href="/" className='font-barrio text-blue text-5xl font-bold justify-left'>JoPia</a>
                </nav>
            </header>
            <div className='w-full flex justify-center mt-18 mb-36'>
                <form onSubmit={handleSubmit} className='w-[35%] h-[60%] bg-[#ffffff] flex-col p-12 rounded shadow-custom'>
                    <div className='w-full flex flex-col p-2 justify-between'>
                        <h3 className='text-2xl font-semibold mb-4'>Login</h3>
                        <div className='w-full flex flex-col'>
                            <label htmlFor='email' className='text-blue font-semibold'>Email Address</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={handleEmailChange}
                                className='h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue'
                            />
                        </div>
                        <div className='w-full flex flex-col mt-3'>
                            <label htmlFor='password' className='text-blue font-semibold'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordChange}
                                className='h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue'
                            />
                        </div>
                        {errorMessage && <span className='text-red-600 font-bold'>{errorMessage}</span>}
                        <div className='relative mt-5'>
                            <button
                                type='submit'
                                disabled={isSigningIn}
                                className={`w-full py-3 bg-blue text-white font-bold ${isSigningIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSigningIn ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center mt-4'>
                        <p className='text-sm font-normal'>
                            Don't have an account? <Link to='/sign-up' className='font-semibold underline text-blue'>Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
