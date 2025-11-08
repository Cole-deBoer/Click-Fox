
import React, { useState } from 'react';
import { auth } from '../../firebase-config';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const SignIn = () => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerVerifyEmail, setRegisterVerifyEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerVerifyPassword, setRegisterVerifyPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerPassword !== registerVerifyPassword) {
            console.error('Passwords do not match');
            return;
        }
        if (registerEmail !== registerVerifyEmail) {
            console.error('Emails do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registerUsername,
                    email: registerEmail,
                    password: registerPassword,
                    testsTaken: 0,
                    maxCPSOneSecond: 0,
                    maxCPSFiveSeconds: 0,
                    maxCPSTenSeconds: 0,
                    maxCPSFiveClicks: 0,
                    maxCPSTenClicks: 0
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registration Successful', data);
                await signInWithEmailAndPassword(auth, registerEmail, registerPassword);
                console.log('Signed in after registration');
                navigate('/'); // Redirect to home after successful registration and sign-in
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during Email/Password registration:', error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log('Sign In Successful');
            navigate('/'); // Redirect to home after successful sign-in
        } catch (error) {
            console.error('Error during Email/Password sign in:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log('Google Sign In Successful');
            navigate('/'); // Redirect to home after successful sign-in
        } catch (error) {
            console.error('Error during Google Sign In:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start justify-center bg-zinc-800 text-zinc-200 p-4 gap-16">
            {/* Register Section */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-8">
                <h2 className="font-bold mb-2">
                    <span className="text-xl">register</span>
                </h2>
                <form onSubmit={handleRegister} className="space-y-5 md:space-y-3">
                    <div>
                        <input
                            type="text"
                            id="registerUsername"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={registerUsername}
                            placeholder='username'
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="registerEmail"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={registerEmail}
                            placeholder='email'
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="registerVerifyEmail"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={registerVerifyEmail}
                            placeholder='verify email'
                            onChange={(e) => setRegisterVerifyEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="registerPassword"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={registerPassword}
                            placeholder='password'
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="registerVerifyPassword"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={registerVerifyPassword}
                            placeholder='verify password'
                            onChange={(e) => setRegisterVerifyPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full justify-center'>
                        <Button content={
                            <button
                                type="submit"
                                className="w-full flex py-2 justify-center bg-zinc-900 rounded-lg text-center text-lg hover:bg-opacity-100"
                                >
                                <span className="text-lg">sign up</span>
                            </button>
                        }/>
                    </div>
                </form>
            </div>

            {/* Login Section */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-8">
                <h2 className="font-bold mb-2">
                    <span className="text-xl">login</span>
                </h2>
                <Button content={
                    <div className="flex py-2 justify-center bg-zinc-900 rounded-lg text-center text-lg hover:bg-opacity-100" onClick={handleGoogleSignIn}>
                        <>google</>
                    </div>
                    }>
                </Button>

                <div className="relative my-6">
                    <div className="flex items-center">
                        <div className="w-full h-px bg-zinc-600"></div>
                    </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            id="loginEmail"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={loginEmail}
                            placeholder='email'
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="loginPassword"
                            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
                            value={loginPassword}
                            placeholder='password'
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                                forgot password?
                            </a>
                        </div>
                    </div>
                    <div className='w-full justify-center'>
                        <Button content={
                            
                            <button className='w-full flex py-2 justify-center bg-zinc-900 rounded-lg text-center text-lg hover:bg-opacity-100'
                            type="submit"
                            >
                                <span className="text-lg ">sign in</span> 
                            </button>
                        }/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
