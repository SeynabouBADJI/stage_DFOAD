import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import CalendarWidget from './CalendarWidget';

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Calendrier des événements à venir</h1>
      </header>
      <div className="content">
        <div className="main-content">
          <CalendarWidget />
        </div>
      </div>

    </div>
  );
}

export default Home;
