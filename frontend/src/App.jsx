import React from 'react';
import Navbar from './components/Navbar';

// views for routing.
import Footer from './components/Footer';
import GameView from './Views/GameView';
import LeaderboardView from './Views/LeaderboardView';
import ProfileView from './Views/ProfileView';
import StatsView from './Views/StatsView';

import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div className='w-full h-screen text-zinc-200 bg-zinc-800 font-sans flex flex-col min-h-screen gap-16 overflow-auto [&::-webkit-scrollbar]:hidden'>
      <div className='h-1/6'>
        <Navbar></Navbar>
      </div>

      <div className='grow'>
        <Routes>
          <Route path="/" element={<GameView/>}/>
          <Route path="/profile" element={<ProfileView/>}/>
          <Route path="/leaderboard" element={<LeaderboardView/>}/>
          <Route path="/stats" element={<StatsView/>}/>
        </Routes>
      </div>

      <div>
        <Footer></Footer>      
      </div>
    </div>
  );
}

export default App;