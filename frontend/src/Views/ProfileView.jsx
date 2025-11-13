import React, { useEffect, useState } from 'react';
import StatCard from '../Components/StatCard';
import axios from 'axios';
import userIcon from '../Assets/user-round.svg'

const ProfileView = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('fetching data');
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/UserOne`); 
                setUserData(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div className="text-white text-center mt-20">Error: {error.message}</div>;
    }

    return (
        <div className="text-white flex flex-col">
            <div className="container mx-auto p-4 flex-grow">
                <div className="bg-zinc-700 p-6 rounded-lg shadow-lg mb-8 flex items-center">
                    <div className="w-24 h-24 bg-zinc-800 opacity-70 rounded-full flex items-center justify-center text-4xl text-gray-400 mr-6">
                        <img src={userIcon} className='w-4/5'></img>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">{isLoading ? 'Loading...' : `${userData?.username}`}</h1>
                        <p className="text-gray-400">Tests Completed: {isLoading ? '' : userData?.testsCompleted}</p>
                    </div>
                </div>
                
                <div className='container flex flex-col space-y-5'>
                    <div className="w-full bg-zinc-700 flex md:flex-row flex-col justify-evenly rounded-lg">
                        <StatCard title="1 Second" value={isLoading ? '' : userData?.maxCPSOneSecond | '-'} isLoading={isLoading} />
                        <StatCard title="5 Seconds" value={isLoading ? '' : userData?.maxCPSFiveSeconds| '-'} isLoading={isLoading} />
                        <StatCard title="10 Seconds" value={isLoading ? '' : userData?.maxCPSTenSeconds| '-'} isLoading={isLoading} />
                    </div>

                    <div className="w-full bg-zinc-700 flex flex-wrap justify-evenly rounded-lg">
                        <StatCard title="5 Clicks" value={isLoading ? '' : userData?.maxCPSFiveClicks | '-'} isLoading={isLoading} />
                        <StatCard title="10 Clicks" value={isLoading ? '' : userData?.maxCPSTenClicks | '-'} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;