import React, {useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../registration';


import CredentialInput from "./CredentialInput";
import Button from "./Button";

const RegistrationSection = () => {
    const username = useRef(null); 
    const email = useRef(null);  
    const verifyEmail = useRef(null);  
    const password = useRef(null);  
    const verifyPassword = useRef(null);  

    const navigate = useNavigate();

    return (

        <div className="w-full md:w-1/2 lg:w-1/3 p-8">
            <h2 className="font-bold mb-2">
                <span className="text-xl">register</span>
            </h2>
            <form onSubmit={(e) => {handleRegister(e, username.current.value, email.current.value, verifyEmail.current.value, 
                password.current.value, verifyPassword.current.value, (route) => navigate(route));
            }} className="space-y-5 md:space-y-3">

                <CredentialInput type="text" ref={username} placeholder='username' />
                <CredentialInput type="email" ref={email} placeholder='email' />
                <CredentialInput type="email" ref={verifyEmail} placeholder='verify email' />
                <CredentialInput type="password" ref={password} placeholder='password' />
                <CredentialInput type="password" ref={verifyPassword} placeholder='password' />

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
    )
}

export default RegistrationSection;
