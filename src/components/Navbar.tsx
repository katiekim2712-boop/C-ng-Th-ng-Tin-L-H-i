import React, { useState } from 'react';
import { Menu, X, Compass, Sparkles } from 'lucide-react';
import { DongSonSunburst } from './DongSonPattern';
import { UserPassportData } from '../utils/userStorage';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  passport: UserPassportData;
  onOpenLuckyWheel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  passport,
  onOpenLuckyWheel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'festivals', label: 'Lễ hội' },
    { id: 'passport', label: 'Hộ chiếu' },
    { id: 'map', label: 'Bản đồ' },
    { id: 'games', label: 'Trò chơi' },
    { id: 'leaderboard', label: 'Xếp hạng' },
    { id: 'about', label: 'Về chúng tôi' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#D97706]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element brand mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#991B1B] text-amber-300 shadow-sm transition-transform group-hover:scale-105">
            <DongSonSunburst size={28} color="#FDE047" className="animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#7F1D1D] font-heading whitespace-nowrap">
              Cổng Lễ hội Vũng Tàu
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#B45309] font-medium hidden sm:inline">
              Di sản miền biển phương Nam
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 tracking-tight transition-colors hover:text-[#B91C1C] whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#B91C1C] font-semibold' : 'text-stone-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B91C1C] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Passport Points Chip (Interactive) */}
          <button
            onClick={() => handleNavClick('passport')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FEF3C7] border border-[#F59E0B]/30 hover:bg-[#FDE68A] transition-colors cursor-pointer text-xs font-semibold text-[#92400E] whitespace-nowrap"
            title="Xem hộ chiếu lễ hội và huy hiệu của bạn"
          >
            <Compass size={15} className="text-[#B45309]" />
            <span className="tabular-nums">{passport.points}</span> điểm
          </button>

          {/* Lucky wheel launcher button */}
          <button
            onClick={onOpenLuckyWheel}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#B91C1C] to-[#C2410C] rounded-lg shadow-sm hover:from-[#991B1B] hover:to-[#B91C1C] transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles size={14} className="text-amber-200" />
            <span>Vòng quay may mắn</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 transition-colors focus:outline-none"
            aria-label="Mở bảng điều hướng"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F0] border-b border-[#D97706]/20 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FEE2E2] text-[#B91C1C] font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenLuckyWheel();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#B91C1C] to-[#C2410C] rounded-lg shadow-sm"
            >
              <Sparkles size={16} className="text-amber-200" />
              <span>Vòng quay may mắn kiến thức</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
