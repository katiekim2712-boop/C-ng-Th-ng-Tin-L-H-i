import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Calendar,
  Clock,
  Car,
  ChevronRight,
  ExternalLink,
  Info,
  Sparkles
} from 'lucide-react';
import { FESTIVALS, FestivalItem } from '../data/festivalData';
import { DongSonSunburst } from './DongSonPattern';

interface InteractiveMapProps {
  onSelectFestival: (festId: string) => void;
}

interface Itinerary {
  id: string;
  title: string;
  duration: string;
  distance: string;
  recommendedMode: string;
  description: string;
  stops: Array<{
    name: string;
    time: string;
    note: string;
  }>;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectFestival }) => {
  const [selectedPin, setSelectedPin] = useState<FestivalItem>(FESTIVALS[0]);
  const [activeRouteTab, setActiveRouteTab] = useState<string>('route-1');

  const itineraries: Itinerary[] = [
    {
      id: 'route-1',
      title: 'Tuyến Tâm Linh Biển Cả 1 Ngày',
      duration: 'Khoảng 6 - 8 tiếng',
      distance: 'Khoảng 12 km',
      recommendedMode: 'Xe máy hoặc Taxi',
      description: 'Khám phá trọn vẹn cụm di tích Thắng Tam và trải nghiệm bước chân trên lối mòn đá ra Miếu Hòn Bà kỳ thú.',
      stops: [
        {
          name: 'Điểm 1: Đình thần Thắng Tam (Nghinh Ông & Kỳ Yên)',
          time: '08:00 - 10:30',
          note: 'Chiêm bái lăng Ông Nam Hải, ngắm kiến trúc rồng thời Nguyễn và tìm hiểu lịch sử khai hoang lập ba làng.',
        },
        {
          name: 'Điểm 2: Thưởng thức bánh khọt Gốc Vú Sữa / Cô Ba Vũng Tàu',
          time: '11:00 - 12:30',
          note: 'Nạp năng lượng với đặc sản giòn rụm nổi danh ngay gần Đình Thắng Tam.',
        },
        {
          name: 'Điểm 3: Miếu Bà Ngũ Hành & Chờ thủy triều Hòn Bà',
          time: '14:30 - 17:00',
          note: 'Dâng hương Mẫu ngũ phương, đi bộ dọc bãi đá khi nước rút và đón hoàng hôn biển Bãi Sau.',
        },
      ],
    },
    {
      id: 'route-2',
      title: 'Tuyến Di Sản Ven Biển Vũng Tàu - Long Hải 2 Ngày 1 Đêm',
      duration: '2 ngày 1 đêm',
      distance: 'Khoảng 38 km',
      recommendedMode: 'Ô tô hoặc Xe máy phượt biển',
      description: 'Cung đường ven biển lộng gió nối liền phố biển Vũng Tàu với không gian văn hóa lễ hội Dinh Cô Long Hải.',
      stops: [
        {
          name: 'Ngày 1: Vũng Tàu - Bãi Trước & Đình Thắng Tam',
          time: 'Cả ngày',
          note: 'Tham gia không khí lễ hội Nghinh Ông hoặc Kỳ Yên, ghé Mũi Nghinh Phong đón gió lộng.',
        },
        {
          name: 'Ngày 2: Chạy cung đường ven biển qua đèo Nước Ngọt tới Dinh Cô',
          time: '07:30 - 15:00',
          note: 'Viếng Dinh Cô Long Hải, hòa vào dòng người trẩy hội bên bờ cát và thả hoa đăng cầu may.',
        },
      ],
    },
  ];

  const activeItinerary = itineraries.find(r => r.id === activeRouteTab) || itineraries[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
          <Navigation size={15} className="text-[#D97706]" />
          <span>Bản đồ Du lịch Văn hóa Vũng Tàu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-heading">
          Bản Đồ Điểm Đến & Tuyến Trình Lễ Hội
        </h2>
        <p className="text-sm text-stone-600 mt-2">
          Định vị các tọa độ lễ hội trên bờ biển Vũng Tàu - Long Hải và gợi ý lộ trình du ngoạn văn hóa tối ưu nhất.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Canvas Visual (Interactive SVG coastal map) */}
        <div className="lg:col-span-2 bg-[#F0FDF4] rounded-3xl border-2 border-[#D97706]/30 p-4 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          {/* Top map toolbar */}
          <div className="flex items-center justify-between z-10 mb-2">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 shadow-xs">
              <Compass size={16} className="text-[#B91C1C]" />
              <span>Khu vực bán đảo Vũng Tàu & Huyện Long Điền</span>
            </div>
            <span className="text-[11px] text-stone-500 bg-white/80 px-2.5 py-1 rounded-lg">
              Nhấp vào biểu tượng ghim để xem chi tiết
            </span>
          </div>

          {/* Stylized Coastal Map SVG */}
          <div className="relative w-full h-[420px] sm:h-[480px] bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC] rounded-2xl overflow-hidden border border-sky-300">
            {/* Animated subtle ocean wave textures */}
            <svg
              className="w-full h-full"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Sea ocean background with subtle grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(2, 132, 199, 0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />

              {/* Landmass 1: Vung Tau Peninsula */}
              <path
                d="M 120 180 C 180 150, 260 170, 310 240 C 340 280, 360 380, 330 460 C 300 530, 250 560, 210 540 C 180 520, 160 480, 160 420 C 160 360, 100 280, 120 180 Z"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />

              {/* Landmass 2: Long Hai Coastal strip */}
              <path
                d="M 450 140 C 520 120, 680 140, 760 220 C 740 300, 680 340, 590 320 C 520 300, 480 240, 450 140 Z"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />

              {/* Connecting coastal road bridge line */}
              <path
                d="M 320 320 Q 420 280, 560 270"
                stroke="#DC2626"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
              />

              {/* Geographic labels */}
              <text x="220" y="360" fill="#78350F" fontSize="14" fontWeight="bold" fontFamily="Outfit">
                BÁN ĐẢO VŨNG TÀU
              </text>
              <text x="540" y="220" fill="#78350F" fontSize="14" fontWeight="bold" fontFamily="Outfit">
                LONG HẢI - LONG ĐIỀN
              </text>
              <text x="140" y="440" fill="#0369A1" fontSize="11" fontStyle="italic">
                Bãi Trước
              </text>
              <text x="310" y="500" fill="#0369A1" fontSize="11" fontStyle="italic">
                Bãi Sau (Thùy Vân)
              </text>
              <text x="210" y="570" fill="#0369A1" fontSize="11" fontStyle="italic">
                Mũi Nghinh Phong
              </text>
              <text x="610" y="340" fill="#0369A1" fontSize="11" fontStyle="italic">
                Bãi biển Long Hải
              </text>
            </svg>

            {/* Custom Interactive Pins overlaid on map */}
            {/* 1. Đình Thần Thắng Tam (Nghinh Ông) */}
            <div
              style={{ top: '56%', left: '32%' }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setSelectedPin(FESTIVALS[0])}
            >
              <div
                className={`relative p-2.5 rounded-full shadow-lg transition-all flex items-center justify-center ${
                  selectedPin.id === FESTIVALS[0].id
                    ? 'bg-[#B91C1C] text-white scale-125 ring-4 ring-amber-300'
                    : 'bg-white text-[#B91C1C] hover:scale-110'
                }`}
              >
                <MapPin size={22} className="fill-current" />
              </div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-white text-[10px] font-bold whitespace-nowrap shadow-xs">
                Đình Thắng Tam
              </span>
            </div>

            {/* 2. Dinh Cô Long Hải */}
            <div
              style={{ top: '42%', left: '72%' }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setSelectedPin(FESTIVALS[1])}
            >
              <div
                className={`relative p-2.5 rounded-full shadow-lg transition-all flex items-center justify-center ${
                  selectedPin.id === FESTIVALS[1].id
                    ? 'bg-[#D97706] text-white scale-125 ring-4 ring-amber-300'
                    : 'bg-white text-[#D97706] hover:scale-110'
                }`}
              >
                <MapPin size={22} className="fill-current" />
              </div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-white text-[10px] font-bold whitespace-nowrap shadow-xs">
                Dinh Cô Long Hải
              </span>
            </div>

            {/* 3. Miếu Bà Ngũ Hành */}
            <div
              style={{ top: '68%', left: '30%' }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setSelectedPin(FESTIVALS[2])}
            >
              <div
                className={`relative p-2.5 rounded-full shadow-lg transition-all flex items-center justify-center ${
                  selectedPin.id === FESTIVALS[2].id
                    ? 'bg-[#C2410C] text-white scale-125 ring-4 ring-amber-300'
                    : 'bg-white text-[#C2410C] hover:scale-110'
                }`}
              >
                <MapPin size={22} className="fill-current" />
              </div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-stone-900/90 text-white text-[10px] font-bold whitespace-nowrap shadow-xs">
                Miếu Bà Ngũ Hành
              </span>
            </div>
          </div>

          {/* Selected Pin Bottom Info Bar */}
          <div className="mt-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={selectedPin.coverImage}
                alt={selectedPin.shortTitle}
                className="w-14 h-14 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412]">
                  {selectedPin.badgeTitle}
                </span>
                <h4 className="text-base font-bold font-heading text-stone-900">
                  {selectedPin.title}
                </h4>
                <p className="text-xs text-stone-500">
                  {selectedPin.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectFestival(selectedPin.id)}
              className="px-4 py-2 rounded-xl bg-[#B91C1C] text-white text-xs font-bold hover:bg-[#991B1B] transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>Xem chi tiết lễ hội</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Sidebar: Suggested Itineraries (Gợi ý lộ trình) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Navigation size={18} className="text-[#0284C7]" />
              <h3 className="text-lg font-bold font-heading text-stone-900">
                Gợi Ý Lộ Trình Di Chuyển
              </h3>
            </div>

            {/* Route selector tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl mb-4 text-xs font-medium">
              {itineraries.map(it => (
                <button
                  key={it.id}
                  onClick={() => setActiveRouteTab(it.id)}
                  className={`py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                    activeRouteTab === it.id
                      ? 'bg-white font-bold text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {it.id === 'route-1' ? 'Tuyến 1 Ngày' : 'Tuyến 2N1Đ'}
                </button>
              ))}
            </div>

            {/* Active Route Details */}
            <div className="space-y-4 text-xs text-stone-700">
              <div>
                <h4 className="text-sm font-bold text-[#9A3412]">
                  {activeItinerary.title}
                </h4>
                <p className="text-stone-500 mt-0.5">
                  {activeItinerary.description}
                </p>
              </div>

              <div className="flex items-center gap-4 py-2 border-y border-stone-100 text-stone-600 font-medium">
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-[#D97706]" />
                  <span>{activeItinerary.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Car size={14} className="text-[#0284C7]" />
                  <span>{activeItinerary.recommendedMode}</span>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="space-y-3 pt-2">
                {activeItinerary.stops.map((stop, idx) => (
                  <div key={idx} className="relative pl-5 border-l-2 border-[#D97706]/40 pb-2">
                    <span className="absolute -left-[7px] top-0.5 w-3 h-3 rounded-full bg-[#D97706] border-2 border-white" />
                    <div className="font-bold text-stone-900">{stop.name}</div>
                    <div className="text-[11px] text-[#B45309] font-medium">{stop.time}</div>
                    <p className="text-stone-600 mt-1 leading-relaxed">{stop.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
