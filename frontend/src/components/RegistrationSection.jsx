import React, {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../registration';


import CredentialInput from "./CredentialInput";
import Button from "./Button";
import { Toast } from "./Toast";

const RegistrationSection = () => {
    const username = useRef(null); 
    const email = useRef(null);  
    const verifyEmail = useRef(null);  
    const password = useRef(null);  
    const verifyPassword = useRef(null);  

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    return (

        <div className="w-full md:w-1/2 lg:w-1/3 p-8">
            <h2 className="font-bold mb-2">
                <span className="text-xl">Register</span>
            </h2>
            <form onSubmit={(e) => {handleRegister(e, username.current.value, email.current.value, verifyEmail.current.value, 
                password.current.value, verifyPassword.current.value, (route) => navigate(route), (message) => setError(message));
            }} className="space-y-5 md:space-y-3">

                <CredentialInput type="text" ref={username} placeholder='username' autoCompleteType='username'/>
                <CredentialInput type="email" ref={email} placeholder='email' autoCompleteType='email'/>
                <CredentialInput type="email" ref={verifyEmail} placeholder='verify email' autoCompleteType='email'/>
                <CredentialInput type="password" ref={password} placeholder='password' autoCompleteType='new-password'/>
                <CredentialInput type="password" ref={verifyPassword} placeholder='verify password' autoCompleteType='new-password'/>

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
            {error != null && <Toast message={error} setMessage={(message) => setError(message)}/>}
        </div>
    )
}

export default RegistrationSection;
