import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import createUser from './Requests/CreateUser';
import getUser from './Requests/GetUser';


/** 
 * Used to handle registration of a user through the register form on the /signin nav route.
*/
export const handleRegister = async (e, username = '', email = '', verifyEmail = '', password = '', 
                                     verifyPassword = '', navigate = (route) => {}, setError = (errorMessage) => {}) => {
    e.preventDefault();
    if (password !== verifyPassword) {
        console.error('Passwords do not match');
        setError(`Passwords do not match.`);
        return;
    }
    if (email !== verifyEmail) {
        console.error('Emails do not match');
        setError(`Emails do not match.`);
        return;
    }
    try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUid = userCredential.user.uid;

        // Call backend API for registration
        await createUser(username, email, firebaseUid, true, (message) => setError(message));
        navigate('/'); // Redirect to home after successful registration and sign-in

    } catch (error) {
        console.error('Error during Email/Password registration:', error);
        setError(`There was an error during registration: ${error}`);
    }
};

/** 
 * Used to handle the sign in of a user through the login form on the /signin nav route.
*/
export const handleSignIn = async (e, email = '', password = '', navigate = (route) => {}, setError = (errorMessage) => {}) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign In Successful');
        navigate('/'); // Redirect to home after successful sign-in
    } catch (error) {
        console.error('Error during Email/Password sign in:', error);
        setError(`There was an error during sign in: ${error}`);
    }
};

/** 
 * Used to handle registration or sign in of a user through the google sign in button on the /signin nav route.
*/
export const handleGoogleSignIn = async (setGoogleAuthUserData = ({stringUid, stringEmail}) => {}, 
                                         shouldDisplayModal = (boolean) => {}, navigate = (route) => {},
                                         setError = (errorMessage) => {} ) => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    const firebaseUid = firebaseUser.uid;
    const email = firebaseUser.email;

    setGoogleAuthUserData({firebaseUid, email})

    // Check if user exists in backend and has a username
    getUser(email, false).then((response) => {
        if(response.status === 200) {
            console.log('Google Sign In Successful');
            navigate('/');
        }
    }).catch((error)=> {
        // This is acceptable because we dont need the user to exist for this sign in. We can register them here
        if(error.status === 404) {
            console.log("no user exists with this email")
            shouldDisplayModal(true);
        } else {
            console.error('Error during Google Sign In or user check:', error);
            setError(`Error during google sign in: ${error}`);
        }
    });
};