import React from 'react';
import { DongSonSunburst, VietnameseLantern } from './DongSonPattern';
import { FESTIVALS } from '../data/festivalData';
import { Compass, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectFestival: (festId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectFestival }) => {
  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-[#D97706]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Background subtle Dong Son watermark */}
      <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
        <DongSonSunburst size={380} color="#F59E0B" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Rationale */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B91C1C] flex items-center justify-center text-amber-300">
                <DongSonSunburst size={28} color="#FDE047" />
              </div>
              <span className="text-lg font-bold font-heading text-white">
                Cổng thông tin Lễ hội Vũng Tàu
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              Nền tảng số văn hóa du lịch kết nối du khách với kho tàng tín ngưỡng dân gian miền biển Bà Rịa - Vũng Tàu. Khám phá phong tục, tích lũy huy hiệu Hộ chiếu số và gìn giữ bản sắc quê hương.
            </p>
            <div className="text-xs text-amber-400/90 font-medium">
              Sản phẩm thuộc đề tài Nghiên cứu Khoa học Di sản Du lịch Vũng Tàu
            </div>
          </div>

          {/* Col 2: 4 Lễ hội tiêu biểu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Lễ hội Di sản
            </h4>
            <ul className="space-y-2 text-xs">
              {FESTIVALS.map(f => (
                <li key={f.id}>
                  <button
                    onClick={() => {
                      onSelectFestival(f.id);
                      setActiveTab('festivals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-amber-200 transition-colors cursor-pointer text-left"
                  >
                    {f.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Điều hướng nhanh */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Tiện ích số
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('passport');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Hộ chiếu lễ hội số & Tích điểm
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Bản đồ tương tác & Lộ trình
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('games');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Khu vực 5 trò chơi dân gian
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('leaderboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Bảng xếp hạng nhà thám hiểm
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Về đề tài nghiên cứu
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Cổng thông tin Lễ hội Vũng Tàu. Bản quyền thuộc nhóm nghiên cứu đề tài.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Thiết kế vì tình yêu di sản biển Vũng Tàu</span>
            <Heart size={13} className="text-red-500 fill-current ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
