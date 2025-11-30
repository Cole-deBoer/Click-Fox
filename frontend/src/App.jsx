import React from 'react';
import Navbar from './Components/Navbar'; // Corrected casing
import { AuthProvider } from './Context/AuthContext'; // Import AuthProvider from new location

// views for routing.
import Footer from './components/Footer';
import GameView from './Views/GameView';
import LeaderboardView from './Views/LeaderboardView';
import ProfileView from './Views/ProfileView';
import SignIn from './Views/SignIn'; // Import SignIn component
import About from './Views/About';

import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <AuthProvider>
      <div className='w-full h-screen text-zinc-200 bg-zinc-800 font-mono flex flex-col min-h-screen gap-16 overflow-auto [&::-webkit-scrollbar]:hidden'>
        <div className='h-1/6'>
          <Navbar></Navbar>
        </div>

        <div className='grow'>
          <Routes>
            <Route path="/" element={<GameView/>}/>
            <Route path="/signin" element={<SignIn/>}/> 
            <Route path="/profile" element={<ProfileView/>}/>
            <Route path="/leaderboard" element={<LeaderboardView/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>

        <div>
          <Footer></Footer>      
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;