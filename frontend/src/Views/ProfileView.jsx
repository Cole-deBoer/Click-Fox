import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import StatCard from '../Components/StatCard';
import userIcon from '../Assets/user-round.svg'
import getUser from '../Requests/GetUser';
import { AuthContext } from '../Context/AuthContext';
import {getAuth, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const ProfileView = () => {
    useEffect(() => {
        document.title = "Click-Fox | User Profile";
        document.querySelector('meta[name="description"]').setAttribute('content', 'View your Click-Fox profile, stats, and clicking test history.');
    }, []);

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const user = useContext(AuthContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        console.log('fetching data', user);

        if(!user.currentUser) {
            navigate('/signin')
            return;
        }

        const fetchUserData = async () => {
            const response = await getUser(user.currentUser.email, true);
            setUserData(response.data);
            setIsLoading(false);
        };

        fetchUserData();
    }, [user]);

    const auth = getAuth();

    return (
        <main className="w-full h-full text-white flex flex-col md:content-center">
            <div className="container h-full mx-auto p-4 flex-grow">
                <div className="xl:py-12 mb-8 p-6 bg-zinc-700 rounded-lg shadow-lg flex flex-col sm:flex-row items-center">
                    <div className="w-24 h-24 bg-zinc-800 opacity-70 rounded-full flex items-center justify-center
                                    text-4xl text-gray-400 mr-6" onClick={() =>{
                                        //Logic for updating profile photo
                                    }}>
                        <img src={userIcon} className='w-4/5' alt="User profile icon"></img>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">{isLoading ? 'Loading...' : `${userData?.username}`}</h1>
                        <p className="text-gray-400">Tests Completed: {isLoading ? '' : userData?.testsTaken || 0}</p>
                    </div>
                </div>
                
                <div className='container flex flex-col space-y-5'>
                    <div className="w-full my-4 xl:my-12 xl:py-12 bg-zinc-700 flex md:flex-row flex-col justify-evenly rounded-lg">
                        <StatCard title="1 Second" value={isLoading ? '' : userData?.maxCPSOneSecond || '-'} isLoading={isLoading} />
                        <StatCard title="5 Seconds" value={isLoading ? '' : userData?.maxCPSFiveSeconds || '-'} isLoading={isLoading} />
                        <StatCard title="10 Seconds" value={isLoading ? '' : userData?.maxCPSTenSeconds || '-'} isLoading={isLoading} />
                    </div>

                    <div className="w-full xl:py-12 bg-zinc-700 flex flex-wrap justify-evenly rounded-lg">
                        <StatCard title="5 Clicks" value={isLoading ? '' : userData?.maxCPSFiveClicks || '-'} isLoading={isLoading} />
                        <StatCard title="10 Clicks" value={isLoading ? '' : userData?.maxCPSTenClicks || '-'} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            {/*Sign out button*/}
            <div className='w-full h-full  flex justify-center items-center'>
                <div className='w-max h-max'>
                    <Button content={
                        <div className='w-full h-full px-6 py-3 flex rounded-lg bg-zinc-700' onClick={() => {
                            console.log('logging out');
                            signOut(auth);
                        }}>
                            sign out
                        </div>
                    }/>
                </div>
            </div>
        </main>
    );
};

export default ProfileView;