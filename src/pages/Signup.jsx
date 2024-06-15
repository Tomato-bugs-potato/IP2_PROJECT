import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Footer from '../components/Footer';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        try {
            const response = await fetch('http://localhost/JobpiaSERVER/signup.php', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.text();
                console.log("Form Submitted Successfully:", data);

                // Proceed to login after successful signup
                try {
                    const loginResponse = await axios.post('http://localhost/JobpiaSERVER/login.php', {
                        email: email,
                        password: password,
                    });

                    if (loginResponse.data.status === "success") {
                        sessionStorage.setItem("loggedIn", true);
                        sessionStorage.setItem("userData", JSON.stringify(loginResponse.data.data));
                        login();
                        navigate('/?newUser=true');
                    } else {
                        setErrorMessage("Login failed after successful signup.");
                    }
                } catch (loginError) {
                    console.error('Error logging in: ', loginError);
                    setErrorMessage('Error logging in after signup.');
                }
            } else {
                console.log("Failed to submit form:", response.statusText);
                setErrorMessage("Failed to submit form.");
            }
        } catch (error) {
            console.error('Error submitting form: ', error);
            setErrorMessage('Error submitting form.');
        }
    };

    return (
        <div>
            <header className='max-w-screen-2xl container mx-auto xl:px-20 px-4'>
                <nav className='flex justify-between items-center py-16'>
                    <a href="" className='font-barrio text-blue text-5xl font-bold justify-left'>JoPia</a>
                </nav>
            </header>
            <div className='w-full flex justify-center mt-18 mb-36'>
                <form onSubmit={handleSubmit} className='w-[34%] h-[60%] flex-col p-12 rounded shadow-custom'>
                    <div className='w-full flex flex-col p-2 justify-between '>
                        <h3 className='text-2xl font-semibold mb-4'>SignUp</h3>
                        <div className='w-full flex flex-col mb-3'>
                            <label className='relative left-0 text-blue font-semibold'>Full Name</label>
                            <input type="text"
                                name='fullName'
                                placeholder="Full Name"
                                className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                autoComplete='off'
                            />
                        </div>
                        <div className='w-full flex flex-col mb-3'>
                            <label className='relative left-0 text-blue font-semibold'>Email Address</label>
                            <input type="email"
                                name='email'
                                placeholder="Email Address"
                                className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='off'
                            />
                        </div>
                        <div className='w-full flex flex-col mb-3'>
                            <label className='relative left-0 text-blue font-semibold'>Password</label>
                            <input type="password"
                                name='password'
                                placeholder="Password"
                                className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'
                            />
                        </div>
                        {errorMessage && (<span className='text-red-600 font-bold'>{errorMessage}</span>)}
                        <div className='relative mt-5'>
                            <button type='submit' className='px-6 py-2 bg-blue text-white font-bold'>Sign Up</button>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <p className='text-sm font-normal'>Already have an account? <Link to='/login' className='font-semibold underline text-blue'>Login</Link></p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
