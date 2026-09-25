/**
 * Cổng thông tin Lễ hội Vũng Tàu - Vũng Tàu Festival Portal
 * Nền tảng số hỗ trợ du khách khám phá các lễ hội truyền thống tại Vũng Tàu, Việt Nam
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { FestivalDetails } from './components/FestivalDetails';
import { FestivalPassport } from './components/FestivalPassport';
import { InteractiveMap } from './components/InteractiveMap';
import { GamesHub } from './components/GamesHub';
import { LeaderboardFeed } from './components/LeaderboardFeed';
import { AboutUs } from './components/AboutUs';
import { Chatbot } from './components/Chatbot';
import { LuckyWheel } from './components/LuckyWheel';
import {
  getStoredPassport,
  saveStoredPassport,
  addPoints,
  UserPassportData
} from './utils/userStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedFestivalId, setSelectedFestivalId] = useState<string>('nghinh-ong-thang-tam');
  const [passport, setPassport] = useState<UserPassportData>(getStoredPassport());
  const [showLuckyWheelModal, setShowLuckyWheelModal] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    saveStoredPassport(passport);
  }, [passport]);

  const handleAddPoints = (amount: number) => {
    const updated = addPoints(amount);
    setPassport({ ...updated });
  };

  const handleSelectFestival = (festId: string) => {
    setSelectedFestivalId(festId);
    setActiveTab('festivals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-stone-900 font-sans selection:bg-[#B91C1C]/15 selection:text-[#B91C1C]">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        passport={passport}
        onOpenLuckyWheel={() => setShowLuckyWheelModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            onSelectFestival={handleSelectFestival}
            passport={passport}
            onAddPoints={handleAddPoints}
          />
        )}

        {activeTab === 'festivals' && (
          <FestivalDetails
            initialFestivalId={selectedFestivalId}
            onNavigateToPassport={() => {
              setActiveTab('passport');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMap={() => {
              setActiveTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'passport' && (
          <FestivalPassport
            passport={passport}
            setPassport={setPassport}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMap
            onSelectFestival={handleSelectFestival}
          />
        )}

        {activeTab === 'games' && (
          <GamesHub
            onAddPoints={handleAddPoints}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardFeed
            passport={passport}
          />
        )}

        {activeTab === 'about' && (
          <AboutUs />
        )}
      </main>

      {/* Personalized Floating Cultural Chatbot */}
      <Chatbot onSelectFestival={handleSelectFestival} />

      {/* Global Lucky Wheel Modal (When triggered from top bar or shortcut) */}
      {showLuckyWheelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg">
            <LuckyWheel
              isModal={true}
              onClose={() => setShowLuckyWheelModal(false)}
              onAddPoints={handleAddPoints}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectFestival={handleSelectFestival}
      />
    </div>
  );
}
