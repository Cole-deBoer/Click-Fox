
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createUser from '../Requests/CreateUser';
import Modal from '../Components/Modal'
import RegistrationSection from '../Components/RegistrationSection';
import LoginSection from '../Components/LoginSection';
import { AuthContext } from '../Context/AuthContext';
import { Toast } from '../Components/Toast';

const SignIn = () => {
    useEffect(() => {
        document.title = "Click-Fox | Sign In";
        document.querySelector('meta[name="description"]').setAttribute('content', 'Sign in or create an account to save your clicking test scores and track your progress.');
    }, []);

    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [googleAuthUserData, setGoogleAuthUserData] = useState(null);   
    const [error, setError] = useState(null);   

    const navigate = useNavigate();
    const user = useContext(AuthContext);

    useEffect(() => {
        if(user.currentUser != null) {
            navigate('/profile');
        }
    }, [])

    return (
        <main className="flex flex-col md:flex-row items-start justify-center bg-zinc-800 text-zinc-200 p-4 gap-16">
            <RegistrationSection/>

            <LoginSection setGoogleAuthUserData={(firebaseUid, email) => setGoogleAuthUserData(firebaseUid, email)}
             setShowUsernameModal={(boolean) => setShowUsernameModal(boolean)}/>

            <Modal
                show={showUsernameModal}
                onCancel={() => {
                    setShowUsernameModal(false);
                    setError('Account Creation Cancelled.');
                }}
                onSubmit={async (username)=>{
                    const {email, firebaseUid} = googleAuthUserData;
                    createUser(username, email, firebaseUid, true);
                    setShowUsernameModal(false);
                    navigate('/');
                }}
                heading='Complete your profile'
                subheading='Please choose a unique username'
                placeholderText='username'
            />
            {error != null && <Toast message={error} setMessage={(message) => setError(message)}/>}
        </main>
    );
};

export default SignIn;
