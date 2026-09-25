import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Calendar,
  MapPin,
  Award,
  ChevronRight,
  Gamepad2,
  Volume2,
  Eye,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { FESTIVALS, FestivalItem } from '../data/festivalData';
import { VietnameseLantern, DongSonSunburst, CulturalDivider } from './DongSonPattern';
import { LuckyWheel } from './LuckyWheel';
import { UserPassportData } from '../utils/userStorage';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onSelectFestival: (festId: string) => void;
  passport: UserPassportData;
  onAddPoints: (pts: number) => void;
}

export const Home: React.FC<HomeProps> = ({
  setActiveTab,
  onSelectFestival,
  passport,
  onAddPoints,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide banner every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % FESTIVALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeFestival = FESTIVALS[currentSlide];

  return (
    <div className="space-y-16 pb-16">
      {/* =========================================================================
          HERO SECTION: DYNAMIC ANIMATED GRAPHICS & SLIDESHOW BANNER
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1C1917] via-[#292524] to-[#1C1917] text-white">
        {/* Animated cultural floating lanterns in corners */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none hidden md:block">
          <VietnameseLantern size={52} color="#DC2626" className="animate-float-lantern opacity-90 drop-shadow-lg" />
        </div>
        <div className="absolute top-12 right-10 z-20 pointer-events-none hidden md:block">
          <VietnameseLantern size={42} color="#D97706" className="animate-float-lantern-slow opacity-85 drop-shadow-lg" />
        </div>

        {/* Rotating Dong Son Sunburst Background Watermark */}
        <div className="absolute -top-24 -right-24 z-10 pointer-events-none opacity-10">
          <DongSonSunburst size={520} color="#FBBF24" className="animate-spin-slow" />
        </div>

        {/* Hero Banner Slideshow Viewport */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy (Editorial rank 1) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-xs">
                <DongSonSunburst size={16} color="#FDE047" className="animate-spin-slow" />
                <span>Nền tảng Di sản Văn hóa Miền Biển</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white">
                Cổng Thông Tin <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300">
                  Lễ Hội Vũng Tàu
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
                Khám phá kho tàng tín ngưỡng dân gian Nam Bộ: Lễ hội Nghinh Ông Thắng Tam, Dinh Cô Long Hải, Miếu Bà Ngũ Hành và Lễ Kỳ Yên cầu an. Thu thập tem hộ chiếu số và cùng bảo tồn di sản biển linh thiêng.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onSelectFestival('nghinh-ong-thang-tam');
                    setActiveTab('festivals');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B91C1C] to-[#C2410C] hover:from-[#991B1B] hover:to-[#B91C1C] text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={16} className="text-amber-200" />
                  <span>Khám phá Nghinh Ông Thắng Tam</span>
                </button>

                <button
                  onClick={() => setActiveTab('passport')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300/40 text-amber-200 font-semibold text-xs sm:text-sm backdrop-blur-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Compass size={16} />
                  <span>Mở Hộ Chiếu Số</span>
                </button>
              </div>

              {/* Quick Cultural Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-800 text-stone-300">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-heading">
                    04
                  </div>
                  <div className="text-[11px] text-stone-400 uppercase tracking-wider">
                    Lễ hội Di sản
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-heading">
                    300+
                  </div>
                  <div className="text-[11px] text-stone-400 uppercase tracking-wider">
                    Năm Tín ngưỡng
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-heading">
                    100%
                  </div>
                  <div className="text-[11px] text-stone-400 uppercase tracking-wider">
                    Trải nghiệm số
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Slideshow Preview Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-stone-900 aspect-4/3">
                <img
                  src={activeFestival.coverImage}
                  alt={activeFestival.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Slide Floating Info Badge */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    {activeFestival.badgeTitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white truncate">
                    {activeFestival.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                    {activeFestival.location}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-amber-200 font-medium">
                      {activeFestival.lunarDate.split('hằng')[0]}
                    </span>
                    <button
                      onClick={() => {
                        onSelectFestival(activeFestival.id);
                        setActiveTab('festivals');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Chi tiết</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {FESTIVALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-stone-600 hover:bg-stone-500'
                    }`}
                    aria-label={`Chuyển đến lễ hội ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: VÒNG QUAY MAY MẮN KIẾN THỨC (TRỰC TIẾP TẠI TRANG CHỦ)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CulturalDivider label="Vòng quay may mắn di sản" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 border-2 border-[#D97706]/30 shadow-md">
          {/* Wheel Explanatory Text */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} className="text-[#D97706]" />
              <span>Không cần đăng nhập</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 tracking-tight">
              Thử Vận May & Đố Vui Văn Hóa
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Quay bánh xe may mắn ngay tại trang chủ để khám phá những bí ẩn thú vị về tín ngưỡng thờ Cá Ông, tục đi bộ ra biển Hòn Bà và các di sản văn hóa Vũng Tàu. Mỗi câu trả lời đúng sẽ cộng điểm trực tiếp vào Hộ chiếu số của bạn!
            </p>

            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Quay bánh xe mượt mà với âm thanh chuyển nan chân thực</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Mỗi nan quạt chứa câu hỏi hoặc sự thật lịch sử hấp dẫn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Nhận ngay điểm thưởng và tích lũy thăng hạng đại sứ</span>
              </div>
            </div>
          </div>

          {/* Wheel Interactive Component */}
          <div className="lg:col-span-7">
            <LuckyWheel onAddPoints={onAddPoints} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: STAR HIGHLIGHT - LỄ HỘI NGHINH ÔNG THẮNG TAM
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden">
          {/* Background Drum Motif */}
          <div className="absolute -right-20 -top-20 opacity-15 pointer-events-none">
            <DongSonSunburst size={340} color="#FDE047" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Tiêu điểm Lễ hội Trọng tâm</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Lễ Hội Nghinh Ông Thắng Tam
              </h2>

              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                Di sản văn hóa phi vật thể quốc gia lớn nhất của ngư dân Vũng Tàu. Nơi hàng chục đoàn thuyền rồng rước Thần Cá Ông trên biển Bãi Trước và Đình thần Thắng Tam phụng thờ bộ ngọc cốt cá voi khổng lồ linh thiêng.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-amber-200">
                <div className="p-3 bg-black/20 rounded-xl border border-amber-300/30">
                  <strong className="block text-white font-bold mb-0.5">Phần Lễ:</strong>
                  Rước sắc phong trên biển, tế thần Tiền hiền, Hậu hiền trang nghiêm.
                </div>
                <div className="p-3 bg-black/20 rounded-xl border border-amber-300/30">
                  <strong className="block text-white font-bold mb-0.5">Phần Hội:</strong>
                  Múa lân sư rồng, hát bội thâu đêm, hội thi thể thao dân gian bờ biển.
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectFestival('nghinh-ong-thang-tam');
                    setActiveTab('festivals');
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Xem hồ sơ chi tiết & Trải nghiệm 360°</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Visual thumbnail */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/60 shadow-lg aspect-16/10">
              <img
                src={FESTIVALS[0].coverImage}
                alt="Lễ hội Nghinh Ông Vũng Tàu"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 4 FESTIVAL CARDS OVERVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900 tracking-tight">
            Tứ Đại Lễ Hội Truyền Thống Vũng Tàu
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Mỗi lễ hội mang trong mình câu chuyện huyền tích và nét đẹp văn hóa độc đáo riêng biệt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FESTIVALS.map(festival => (
            <div
              key={festival.id}
              className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={festival.coverImage}
                    alt={festival.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                    {festival.badgeTitle}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#B45309] font-medium">
                    <Calendar size={13} />
                    <span>{festival.lunarDate.split('hằng')[0]}</span>
                  </div>

                  <h3 className="font-bold text-base font-heading text-stone-900 group-hover:text-[#B91C1C] transition-colors line-clamp-1">
                    {festival.shortTitle}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {festival.overview}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    onSelectFestival(festival.id);
                    setActiveTab('festivals');
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-[#B91C1C] hover:text-white text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Khám phá lễ hội</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PASSPORT & GAMES QUICK TEASER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Passport Teaser */}
          <div className="p-8 bg-gradient-to-br from-[#FAF7F0] to-[#FFFBEB] rounded-3xl border-2 border-[#D97706]/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B91C1C] text-white flex items-center justify-center shadow-xs">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold font-heading text-stone-900">
                Hộ Chiếu Lễ Hội Số
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Đóng dấu điện tử tại mỗi lễ hội để nhận các huy hiệu độc quyền và thăng cấp: Người mới → Tín đồ lễ hội → Đại sứ văn hóa Vũng Tàu.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setActiveTab('passport')}
                className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Xem hộ chiếu của bạn ({passport.points}đ)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Games Teaser */}
          <div className="p-8 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-3xl border-2 border-[#0284C7]/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center shadow-xs">
                <Gamepad2 size={24} />
              </div>
              <h3 className="text-xl font-bold font-heading text-stone-900">
                5 Trò Chơi Dân Gian Số
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Đoán lễ hội qua hình ảnh, Đúng hay Sai, Ghép đúng cặp Memory, Timeline thời gian và Vòng quay may mắn đang chờ bạn chinh phục!
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setActiveTab('games')}
                className="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Chơi game rinh điểm thưởng</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
