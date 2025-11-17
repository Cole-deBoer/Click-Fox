
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createUser from '../Requests/CreateUser';
import Modal from '../Components/Modal'
import RegistrationSection from '../Components/RegistrationSection';
import LoginSection from '../Components/LoginSection';
import { AuthContext } from '../Context/AuthContext';

const SignIn = () => {
    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [googleAuthUserData, setGoogleAuthUserData] = useState(null);   

    const navigate = useNavigate();
    const user = useContext(AuthContext);

    useEffect(() => {
        if(user.currentUser != null) {
            navigate('/profile');
        }
    }, [])

    return (
        <div className="flex flex-col md:flex-row items-start justify-center bg-zinc-800 text-zinc-200 p-4 gap-16">
            <RegistrationSection/>

            <LoginSection setGoogleAuthUserData={(firebaseUid, email) => setGoogleAuthUserData(firebaseUid, email)}
             setShowUsernameModal={(boolean) => setShowUsernameModal(boolean)}/>

            <Modal
                show={showUsernameModal}
                onCancel={() => {
                    setShowUsernameModal(false);
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
        </div>
    );
};

export default SignIn;
