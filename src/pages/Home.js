import React from 'react';
import SportsNews from '../components/SportsNews';
import CricketScores from '../components/CricketScores';

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Live Sports Updates</h1>
      <SportsNews />
      <h1 style={{ textAlign: 'center', margin: '40px 0' }}>Cricket Live Scores</h1>
      <CricketScores />
    </div>
  );
};

export default Home;
