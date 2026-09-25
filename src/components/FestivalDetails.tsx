import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Eye,
  Download,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Compass,
  CheckCircle2,
  Info,
  RotateCw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { FESTIVALS, FestivalItem } from '../data/festivalData';
import { VoiceNarrator } from '../utils/audioEffects';
import { DongSonSunburst, CulturalDivider } from './DongSonPattern';

interface FestivalDetailsProps {
  initialFestivalId?: string;
  onNavigateToPassport?: () => void;
  onNavigateToMap?: () => void;
}

export const FestivalDetails: React.FC<FestivalDetailsProps> = ({
  initialFestivalId = 'nghinh-ong-thang-tam',
  onNavigateToPassport,
  onNavigateToMap,
}) => {
  const [selectedFestivalId, setSelectedFestivalId] = useState<string>(initialFestivalId);
  const [viewMode, setViewMode] = useState<'editorial' | 'flipbook'>('editorial');
  const [flipbookPage, setFlipbookPage] = useState<number>(0); // 0: Overview, 1: Origin, 2: Ceremony, 3: Festivity
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [show360Modal, setShow360Modal] = useState<boolean>(false);
  const [showLeafletModal, setShowLeafletModal] = useState<boolean>(false);

  const activeFestival = FESTIVALS.find(f => f.id === selectedFestivalId) || FESTIVALS[0];

  // Panorama 360 simulation state
  const [panoYaw, setPanoYaw] = useState<number>(0);
  const [panoPitch, setPanoPitch] = useState<number>(0);
  const [panoZoom, setPanoZoom] = useState<number>(1);
  const isDraggingPano = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Reset page and stop voice when festival changes
    setFlipbookPage(0);
    VoiceNarrator.stop();
    setIsSpeaking(false);
  }, [selectedFestivalId]);

  // Voice handler
  const handleToggleVoice = () => {
    if (isSpeaking) {
      VoiceNarrator.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      VoiceNarrator.speak(
        activeFestival.audioVoiceText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  // Flipbook pages data
  const flipPages = [
    {
      title: 'Trang 1: Tổng quan & Thời gian',
      content: activeFestival.overview,
      subtitle: `${activeFestival.lunarDate} · ${activeFestival.location}`,
      badge: 'Tổng quan di sản',
    },
    {
      title: 'Trang 2: Cội nguồn & Tín ngưỡng',
      content: activeFestival.originAndBelief,
      subtitle: activeFestival.culturalSignificance,
      badge: 'Nguồn cội văn hóa',
    },
    {
      title: 'Trang 3: Phần Lễ Trang Nghiêm',
      content: `${activeFestival.ceremonyPart.summary}\n\n${activeFestival.ceremonyPart.rituals.map(r => `• ${r.time} - ${r.name}: ${r.description}`).join('\n\n')}`,
      subtitle: activeFestival.ceremonyPart.title,
      badge: 'Nghi thức tế lễ',
    },
    {
      title: 'Trang 4: Phần Hội Tưng Bừng',
      content: `${activeFestival.festivityPart.summary}\n\n${activeFestival.festivityPart.activities.map(a => `• ${a.name}: ${a.description}`).join('\n\n')}`,
      subtitle: activeFestival.festivityPart.title,
      badge: 'Hội hè dân gian',
    },
  ];

  // 360 canvas interaction
  const handlePanoMouseDown = (e: React.MouseEvent) => {
    isDraggingPano.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePanoMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPano.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setPanoYaw(prev => prev + dx * 0.4);
    setPanoPitch(prev => Math.max(-40, Math.min(40, prev - dy * 0.3)));
  };

  const handlePanoMouseUp = () => {
    isDraggingPano.current = false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Festival Selector Bar */}
      <div className="mb-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
            <DongSonSunburst size={16} color="#B45309" />
            <span>Kho tàng Di sản Văn hóa Miền Biển</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-heading">
            Khám phá 4 Lễ hội Tiêu biểu Vũng Tàu
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Trải nghiệm đa giác quan với chế độ đọc lật trang Flipbook, giọng đọc voice thuyết minh và không gian 360° thực tế ảo.
          </p>
        </div>

        {/* Festival Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-1.5 bg-stone-200/50 rounded-2xl">
          {FESTIVALS.map(fest => {
            const isSelected = fest.id === selectedFestivalId;
            const isHighlight = fest.id === 'nghinh-ong-thang-tam';
            return (
              <button
                key={fest.id}
                onClick={() => setSelectedFestivalId(fest.id)}
                className={`relative p-3 sm:p-4 rounded-xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-md border-2 border-[#D97706]/40 text-stone-900'
                    : 'bg-transparent text-stone-600 hover:bg-white/60 hover:text-stone-900'
                }`}
              >
                {isHighlight && (
                  <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-[#B91C1C] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Trọng tâm
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] truncate">
                  {fest.badgeTitle}
                </div>
                <div className="text-sm sm:text-base font-bold font-heading truncate mt-0.5">
                  {fest.shortTitle}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 truncate">
                  {fest.lunarDate.split('hằng')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Utility Bar: Voice, Flipbook toggle, 360 view, E-Leaflet */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#FAF7F0] border border-[#D97706]/20 rounded-2xl mb-8 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Voice Narrator Button */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ${
              isSpeaking
                ? 'bg-[#B91C1C] text-white animate-pulse'
                : 'bg-[#FEF3C7] text-[#9A3412] hover:bg-[#FDE68A]'
            }`}
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isSpeaking ? 'Dừng đọc voice' : 'Nghe voice thuyết minh'}</span>
          </button>

          {/* 360 Degree Panorama Button */}
          <button
            onClick={() => setShow360Modal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
          >
            <Eye size={16} className="text-[#0284C7]" />
            <span>Xem không gian 360°</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle: Editorial vs Flipbook */}
          <div className="flex items-center p-1 bg-stone-200/70 rounded-xl text-xs font-medium">
            <button
              onClick={() => setViewMode('editorial')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'editorial'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Toàn cảnh
            </button>
            <button
              onClick={() => setViewMode('flipbook')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'flipbook'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen size={14} className="text-[#D97706]" />
              <span>Sách lật (Flipbook)</span>
            </button>
          </div>

          {/* E-Leaflet Download Modal trigger */}
          <button
            onClick={() => setShowLeafletModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white transition-colors cursor-pointer shadow-xs"
          >
            <Download size={15} />
            <span>Cẩm nang du lịch (E-Leaflet)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE 1: FLIPBOOK READER VIEW
         ========================================================================= */}
      {viewMode === 'flipbook' ? (
        <div className="bg-gradient-to-r from-[#F7F2E7] via-[#FAF7F0] to-[#F7F2E7] p-6 sm:p-10 rounded-3xl border-2 border-[#D97706]/30 shadow-xl max-w-4xl mx-auto my-6 relative overflow-hidden">
          {/* Flipbook paper binding effect */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#D97706]/20 hidden md:block" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-[#B91C1C]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#B45309]">
                {flipPages[flipbookPage].badge}
              </span>
            </div>
            <div className="text-xs text-stone-500 font-medium">
              Trang {flipbookPage + 1} / {flipPages.length}
            </div>
          </div>

          {/* Page Content */}
          <div className="min-h-[300px] flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 mb-2">
                {activeFestival.title}
              </h3>
              <p className="text-xs font-semibold text-[#9A3412] mb-4">
                {flipPages[flipbookPage].subtitle}
              </p>
              <div className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line space-y-3">
                {flipPages[flipbookPage].content}
              </div>
            </div>

            {/* Flip Navigation Controls */}
            <div className="flex items-center justify-between pt-8 border-t border-stone-200 mt-8">
              <button
                onClick={() => setFlipbookPage(prev => Math.max(0, prev - 1))}
                disabled={flipbookPage === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  flipbookPage === 0
                    ? 'opacity-40 cursor-not-allowed text-stone-400'
                    : 'bg-white hover:bg-stone-100 text-stone-800 shadow-xs border border-stone-200'
                }`}
              >
                <ChevronLeft size={18} />
                <span>Trang trước</span>
              </button>

              <div className="flex gap-1.5">
                {flipPages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFlipbookPage(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      flipbookPage === idx ? 'bg-[#B91C1C] w-6' : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setFlipbookPage(prev => Math.min(flipPages.length - 1, prev + 1))}
                disabled={flipbookPage === flipPages.length - 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  flipbookPage === flipPages.length - 1
                    ? 'opacity-40 cursor-not-allowed text-stone-400'
                    : 'bg-[#B91C1C] text-white hover:bg-[#991B1B] shadow-xs'
                }`}
              >
                <span>Trang kế tiếp</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
            VIEW MODE 2: FULL EDITORIAL DEEP DIVE (STAR HIGHLIGHT FOR NGHINH ONG)
           ========================================================================= */
        <div className="space-y-12">
          {/* Main Hero Card with High-Fidelity Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#D97706]/20 bg-stone-900">
            <div className="relative h-[360px] sm:h-[460px] w-full">
              <img
                src={activeFestival.coverImage}
                alt={activeFestival.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Overlay Content */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 text-white max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B91C1C]/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs mb-3">
                <Sparkles size={14} className="text-amber-300" />
                <span>Di sản văn hóa phi vật thể quốc gia</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white mb-3">
                {activeFestival.title}
              </h1>

              <p className="text-sm sm:text-base text-stone-200 leading-relaxed line-clamp-2 max-w-3xl mb-4">
                {activeFestival.tagline}
              </p>

              {/* Quick Metadata Info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-amber-200">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-amber-400" />
                  <span>{activeFestival.lunarDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-amber-400" />
                  <span>{activeFestival.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* STAR HIGHLIGHT: Deep Cultural Presentation for Nghinh Ong Thắng Tam */}
          {activeFestival.id === 'nghinh-ong-thang-tam' ? (
            <div className="space-y-12">
              {/* Introduction & Origin Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-stone-900 mb-3">
                      Ý nghĩa & Cội nguồn Tín ngưỡng Thờ Cá Ông
                    </h3>
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-4">
                      {activeFestival.overview}
                    </p>
                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-4">
                      {activeFestival.originAndBelief}
                    </p>

                    <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-xs sm:text-sm text-[#92400E] leading-relaxed">
                      <span className="font-bold block mb-1">Truyền thuyết ngọc cốt Cá Voi:</span>
                      Đình thần Thắng Tam hiện phụng thờ và lưu giữ trọn vẹn bộ ngọc cốt cá voi khổng lồ được ngư dân cung thỉnh từ bờ biển Bãi Trước hơn một thế kỷ trước. Hằng năm, lễ rước bắt đầu từ tờ mờ sáng với hàng chục ghe thuyền kết hoa đăng tiến ra nghinh Thần.
                    </div>
                  </div>

                  {/* 2 Column: PHẦN LỄ & PHẦN HỘI (Distinct Separation) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phần Lễ */}
                    <div className="p-6 bg-gradient-to-br from-[#FEF2F2] to-[#FFF1F2] rounded-2xl border-2 border-[#B91C1C]/20 shadow-xs">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="p-2 rounded-lg bg-[#B91C1C] text-white">
                          <Compass size={18} />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1B]">
                            Nghi thức tôn giáo
                          </span>
                          <h4 className="text-lg font-bold font-heading text-[#7F1D1D]">
                            PHẦN LỄ TRANG NGHIÊM
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 mb-4">
                        {activeFestival.ceremonyPart.summary}
                      </p>
                      <div className="space-y-3">
                        {activeFestival.ceremonyPart.rituals.map((r, i) => (
                          <div key={i} className="p-3 bg-white/80 rounded-xl border border-red-100 text-xs">
                            <div className="font-bold text-[#991B1B] mb-0.5">{r.name}</div>
                            <div className="text-[11px] text-[#D97706] font-medium mb-1">{r.time}</div>
                            <p className="text-stone-700 leading-relaxed">{r.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Phần Hội */}
                    <div className="p-6 bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] rounded-2xl border-2 border-[#D97706]/20 shadow-xs">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="p-2 rounded-lg bg-[#D97706] text-white">
                          <Sparkles size={18} />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
                            Sinh hoạt cộng đồng
                          </span>
                          <h4 className="text-lg font-bold font-heading text-[#78350F]">
                            PHẦN HỘI TƯNG BỪNG
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 mb-4">
                        {activeFestival.festivityPart.summary}
                      </p>
                      <div className="space-y-3">
                        {activeFestival.festivityPart.activities.map((a, i) => (
                          <div key={i} className="p-3 bg-white/80 rounded-xl border border-amber-100 text-xs">
                            <div className="font-bold text-[#B45309] mb-1">{a.name}</div>
                            <p className="text-stone-700 leading-relaxed">{a.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Quick Cards: Tips, Schedule & Check-in Passport CTA */}
                <div className="space-y-6">
                  {/* Passport Check-in Quick Prompt */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#991B1B] to-[#B91C1C] text-white shadow-md">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Compass size={16} />
                      <span>Hộ chiếu lễ hội số</span>
                    </div>
                    <h4 className="text-lg font-bold font-heading mb-2">
                      Thu thập Con Tem Nghinh Ông
                    </h4>
                    <p className="text-xs text-amber-100 leading-relaxed mb-4">
                      Check-in ngay để tích lũy +150 điểm và mở khóa Huy hiệu độc quyền "Hộ Thần Biển Cả" trong cuốn hộ chiếu số của bạn.
                    </p>
                    {onNavigateToPassport && (
                      <button
                        onClick={onNavigateToPassport}
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold transition-colors cursor-pointer text-center shadow-xs"
                      >
                        Đến trang Hộ chiếu số
                      </button>
                    )}
                  </div>

                  {/* Visitor Practical Tips */}
                  <div className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                      <Info size={16} className="text-[#0284C7]" />
                      <span>Cẩm nang dành cho du khách</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-stone-700">
                      {activeFestival.visitorTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Official Social Media Channels */}
                  <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#D97706]/20 shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] block mb-3">
                      Kênh truyền thông chính thức
                    </span>
                    <div className="flex flex-col gap-2">
                      <a
                        href={activeFestival.socialLinks.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-800 hover:border-[#1877F2] hover:text-[#1877F2] transition-colors"
                      >
                        <span>Trang Facebook Lễ hội</span>
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href={activeFestival.socialLinks.tiktok}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-800 hover:border-black hover:text-black transition-colors"
                      >
                        <span>Kênh TikTok Khám phá Lễ hội</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Other 3 Festivals: Comprehensive standard view */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <h3 className="text-xl font-bold font-heading text-stone-900 mb-3">
                    Nguồn gốc & Không gian Lễ hội
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-4">
                    {activeFestival.overview}
                  </p>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {activeFestival.originAndBelief}
                  </p>
                </div>

                {/* Ceremony & Festivities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200">
                    <h4 className="font-bold text-sm text-[#991B1B] uppercase tracking-wider mb-2">
                      {activeFestival.ceremonyPart.title}
                    </h4>
                    <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                      {activeFestival.ceremonyPart.summary}
                    </p>
                    <div className="space-y-2 text-xs text-stone-700">
                      {activeFestival.ceremonyPart.rituals.map((r, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-stone-200">
                          <span className="font-bold block text-stone-900">{r.name}</span>
                          <span className="text-[11px] text-stone-500">{r.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200">
                    <h4 className="font-bold text-sm text-[#B45309] uppercase tracking-wider mb-2">
                      {activeFestival.festivityPart.title}
                    </h4>
                    <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                      {activeFestival.festivityPart.summary}
                    </p>
                    <div className="space-y-2 text-xs text-stone-700">
                      {activeFestival.festivityPart.activities.map((a, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-stone-200">
                          <span className="font-bold block text-stone-900">{a.name}</span>
                          <span className="text-stone-600 leading-relaxed">{a.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                    Lưu ý khi tham quan
                  </div>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {activeFestival.visitorTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#D97706]/20 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] block mb-2">
                    Kênh truyền thông mạng xã hội
                  </span>
                  <div className="flex flex-col gap-2">
                    <a
                      href={activeFestival.socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 hover:text-[#1877F2]"
                    >
                      <span>Trang Facebook chính thức</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={activeFestival.socialLinks.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 hover:text-black"
                    >
                      <span>Kênh TikTok lễ hội</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODAL 1: 360 DEGREE PANORAMA VIEWER SIMULATOR
         ========================================================================= */}
      {show360Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-5xl bg-stone-900 rounded-3xl overflow-hidden border border-stone-700 shadow-2xl flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-stone-950/80 border-b border-stone-800 text-white z-20">
              <div className="flex items-center gap-2.5">
                <Eye size={18} className="text-[#0284C7]" />
                <span className="text-sm font-bold font-heading">
                  Không gian thực tế ảo 360° · {activeFestival.title}
                </span>
              </div>
              <button
                onClick={() => setShow360Modal(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 transition-colors"
              >
                Đóng [Esc]
              </button>
            </div>

            {/* Panorama Viewport */}
            <div
              className="relative h-[480px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handlePanoMouseDown}
              onMouseMove={handlePanoMouseMove}
              onMouseUp={handlePanoMouseUp}
              onMouseLeave={handlePanoMouseUp}
            >
              <div
                style={{
                  transform: `scale(${panoZoom}) rotateY(${panoYaw}deg) rotateX(${panoPitch}deg)`,
                  transformOrigin: 'center center',
                  transition: isDraggingPano.current ? 'none' : 'transform 0.2s ease-out',
                }}
                className="w-full h-full relative"
              >
                <img
                  src={activeFestival.coverImage}
                  alt="360 view"
                  className="w-full h-full object-cover filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Simulated Interactive Hotspots on 360 Scene */}
                <div
                  style={{ top: '45%', left: '35%' }}
                  className="absolute p-2 rounded-full bg-[#B91C1C]/90 text-white border-2 border-amber-300 shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform group"
                  onClick={e => {
                    e.stopPropagation();
                    alert(`Điểm nhấn: ${activeFestival.ceremonyPart.rituals[0]?.name || 'Khu vực tế tự'}`);
                  }}
                >
                  <Sparkles size={16} className="animate-spin-slow" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap px-2 py-1 rounded bg-black/90 text-[11px] text-amber-200">
                    Khu vực tế lễ trung tâm
                  </span>
                </div>

                <div
                  style={{ top: '60%', left: '68%' }}
                  className="absolute p-2 rounded-full bg-[#D97706]/90 text-white border-2 border-amber-300 shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform group"
                  onClick={e => {
                    e.stopPropagation();
                    alert(`Điểm nhấn: ${activeFestival.festivityPart.activities[0]?.name || 'Sân khấu dân gian'}`);
                  }}
                >
                  <Compass size={16} />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap px-2 py-1 rounded bg-black/90 text-[11px] text-amber-200">
                    Sân hội & Trò chơi dân gian
                  </span>
                </div>
              </div>

              {/* Instructions overlay */}
              <div className="absolute bottom-4 left-4 pointer-events-none px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xs text-[11px] text-stone-300">
                Nhấp & kéo chuột để xoay 360° quanh không gian lễ hội
              </div>

              {/* Controls bar */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-xs p-1.5 rounded-xl border border-stone-700">
                <button
                  onClick={() => setPanoZoom(prev => Math.min(1.8, prev + 0.2))}
                  className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300"
                  title="Phóng to"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={() => setPanoZoom(prev => Math.max(0.8, prev - 0.2))}
                  className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300"
                  title="Thu nhỏ"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  onClick={() => {
                    setPanoYaw(0);
                    setPanoPitch(0);
                    setPanoZoom(1);
                  }}
                  className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300"
                  title="Đặt lại góc nhìn"
                >
                  <RotateCw size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: E-LEAFLET / CẨM NANG DU LỊCH LỄ HỘI
         ========================================================================= */}
      {showLeafletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-3xl border-2 border-[#D97706]/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309]">
                  Cẩm nang bỏ túi điện tử
                </span>
                <h3 className="text-xl font-bold font-heading text-stone-900">
                  {activeFestival.title} - E-Leaflet
                </h3>
              </div>
              <button
                onClick={() => setShowLeafletModal(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-xs font-semibold text-stone-700 transition-colors"
              >
                Đóng
              </button>
            </div>

            {/* Leaflet Content */}
            <div className="space-y-5 text-stone-800 text-xs sm:text-sm">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-bold text-[#9A3412] block mb-1">Thời gian & Địa điểm:</span>
                <p>• {activeFestival.lunarDate}</p>
                <p>• {activeFestival.location}</p>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1.5">Nghi lễ chính không thể bỏ lỡ:</span>
                <ul className="list-disc list-inside space-y-1 text-stone-700">
                  {activeFestival.ceremonyPart.rituals.map((r, i) => (
                    <li key={i}>
                      <strong>{r.name}</strong> ({r.time})
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1.5">Kênh thông tin trực tuyến chính thức:</span>
                <p className="text-stone-600 mb-2">
                  Theo dõi lịch trình trực tiếp, livestream và hình ảnh mới nhất tại:
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={activeFestival.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-semibold flex items-center justify-center gap-1.5 text-xs hover:bg-blue-100"
                  >
                    <span>Facebook: {activeFestival.shortTitle}</span>
                    <ExternalLink size={13} />
                  </a>
                  <a
                    href={activeFestival.socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-2.5 rounded-lg bg-stone-100 border border-stone-300 text-stone-900 font-semibold flex items-center justify-center gap-1.5 text-xs hover:bg-stone-200"
                  >
                    <span>TikTok: {activeFestival.shortTitle}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-stone-200 mt-6">
              <button
                onClick={() => {
                  alert('Cẩm nang E-Leaflet (PDF) đang được xuất bản cho thiết bị của bạn!');
                  setShowLeafletModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download size={15} />
                <span>Tải Cẩm Nang Về Máy (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
