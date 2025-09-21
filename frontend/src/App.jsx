import React from 'react';
import Navbar from './components/Navbar';

// views for routing.
import Footer from './components/Footer';
import GameView from './Views/GameView';
import LeaderboardView from './Views/Leaderboard';
import ProfileView from './Views/ProfileView';
import StatsView from './Views/StatsView';

import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div className='w-full h-screen p-2 text-zinc-400 bg-zinc-700 font-sans justify-center overflow-auto [&::-webkit-scrollbar]:hidden'>
      <Navbar></Navbar>
      <Footer></Footer>

      <Routes>
        <Route path="/" element={<GameView/>}/>
        <Route path="/profile" element={<ProfileView/>}/>
        <Route path="/leaderboard" element={<LeaderboardView/>}/>
        <Route path="/stats" element={<StatsView/>}/>
      </Routes>
    </div>
  );
}

export default App;