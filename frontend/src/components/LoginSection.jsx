import React, {useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { handleSignIn, handleGoogleSignIn } from '../registration';
import {sendPasswordResetEmail} from 'firebase/auth'
import {getAuth} from 'firebase/auth'


import CredentialInput from "./CredentialInput";
import Button from "./Button";
import Modal from "./Modal";
import {useState} from "react";

const LoginSection = ({setGoogleAuthUserData = (firebaseUid, email) => {}, setShowUsernameModal = (boolean) => {}}) => {
    const email = useRef(null);  
    const password = useRef(null);
    const navigate = useNavigate();

    const auth = getAuth();
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-8">
            <h2 className="font-bold mb-2">
                <span className="text-xl">login</span>
            </h2>
            <Button content={
                <div className="flex py-2 justify-center bg-zinc-900 rounded-lg text-center text-lg hover:bg-opacity-100" onClick={() => {
                    handleGoogleSignIn((firebaseUid, email) => {setGoogleAuthUserData(firebaseUid, email)},
                                        (boolean) => {setShowUsernameModal(boolean)}, (route) => navigate(route));
                    }}>
                    <>google</>
                </div>
                }>
            </Button>

            <div className="relative my-6">
                <div className="flex items-center">
                    <div className="w-full h-px bg-zinc-600"></div>
                </div>
            </div>

            <form onSubmit={(e) => handleSignIn(e, email.current.value, password.current.value, (route) => navigate(route))} className="space-y-4">
                <CredentialInput type='email' placeholder='email' ref={email}/>
                <CredentialInput type='password' placeholder='password' ref={password}/>
                
                <div className='w-full'>
                    <Button content={
                        <button className='w-full py-2 bg-zinc-900 rounded-lg text-center text-lg hover:bg-opacity-100'
                        type="submit"
                        >
                            <span className="text-lg ">sign in</span> 
                        </button>
                    }/>
                </div>
                <div className="w-full text-xs">
                    <Button content={
                        <a href="#" onClick={() => setShowForgotPasswordModal(true)}>
                            forgot password?
                        </a>
                    }/>
                </div>
            </form>
            <Modal
                show={showForgotPasswordModal}
                onCancel={() => {
                    setShowForgotPasswordModal(false);
                }}
                onSubmit={async (email) => {
                    try {
                        await sendPasswordResetEmail(auth, email);
                        setShowForgotPasswordModal(false);
                    } catch (error) {
                        console.error('Error when sending password reset email.', error);
                    }
                }}
                heading="Forgot password"
                placeholderText="email"
            >
               
            </Modal>
        </div>
    )
} 

export default LoginSection