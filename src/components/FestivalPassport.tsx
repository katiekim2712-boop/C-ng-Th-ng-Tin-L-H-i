import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  CheckCircle2,
  QrCode,
  Award,
  Sparkles,
  Camera,
  Share2,
  Calendar,
  Lock,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { FESTIVALS } from '../data/festivalData';
import {
  UserPassportData,
  checkinFestival,
  saveStoredPassport,
  calculateLevel
} from '../utils/userStorage';
import { DongSonSunburst, VietnameseLantern } from './DongSonPattern';
import { soundEffects } from '../utils/audioEffects';

interface FestivalPassportProps {
  passport: UserPassportData;
  setPassport: React.Dispatch<React.SetStateAction<UserPassportData>>;
}

export const FestivalPassport: React.FC<FestivalPassportProps> = ({
  passport,
  setPassport,
}) => {
  const [activeTab, setActiveTab] = useState<'stamps' | 'badges' | 'scan'>('stamps');
  const [selectedFestivalForCheckin, setSelectedFestivalForCheckin] = useState<string>('nghinh-ong-thang-tam');
  const [qrCodeInput, setQrCodeInput] = useState<string>('');
  const [checkinMessage, setCheckinMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Level progress calculation
  // Level 1: Người mới (0 - 199 pts)
  // Level 2: Tín đồ lễ hội (200 - 499 pts)
  // Level 3: Đại sứ văn hóa Vũng Tàu (500+ pts)
  const currentPoints = passport.points;
  let nextLevelName = 'Tín đồ lễ hội';
  let targetPoints = 200;
  let progressPercent = Math.min(100, Math.round((currentPoints / 200) * 100));

  if (currentPoints >= 200 && currentPoints < 500) {
    nextLevelName = 'Đại sứ văn hóa Vũng Tàu';
    targetPoints = 500;
    progressPercent = Math.min(100, Math.round(((currentPoints - 200) / 300) * 100));
  } else if (currentPoints >= 500) {
    nextLevelName = 'Cấp tối đa (Đại sứ danh dự)';
    targetPoints = 500;
    progressPercent = 100;
  }

  const handleInstantCheckin = (festivalId: string) => {
    const fest = FESTIVALS.find(f => f.id === festivalId);
    if (!fest) return;

    const res = checkinFestival(fest.id, fest.badgeTitle, fest.stampIcon);
    if (res.alreadyCheckedIn) {
      setCheckinMessage({
        type: 'info',
        text: `Bạn đã check-in con tem "${fest.shortTitle}" từ trước rồi!`,
      });
      return;
    }

    setPassport(res.passport);
    soundEffects.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setCheckinMessage({
      type: 'success',
      text: `Chúc mừng bạn đã đóng dấu tem "${fest.shortTitle}"! Nhận ngay +150 điểm và Huy hiệu "${fest.badgeTitle}"!`,
    });
  };

  const handleQrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = qrCodeInput.trim().toUpperCase();
    const fest = FESTIVALS.find(f => f.secretCheckinCode === cleanCode || f.id.toUpperCase() === cleanCode);

    if (!fest) {
      setCheckinMessage({
        type: 'error',
        text: 'Mã QR không hợp lệ! Vui lòng kiểm tra lại mã tại bàn check-in lễ hội hoặc quét mã mẫu.',
      });
      return;
    }

    handleInstantCheckin(fest.id);
    setQrCodeInput('');
  };

  const handleSimulateScanCamera = (festId: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleInstantCheckin(festId);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
          <Award size={16} className="text-[#D97706]" />
          <span>Hộ chiếu Văn hóa Số Vũng Tàu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-heading">
          Sổ Hành Trình Khám Phá Lễ Hội
        </h2>
        <p className="text-sm text-stone-600 mt-2">
          Đóng dấu hành trình tại mỗi lễ hội, tích lũy điểm thưởng và thăng hạng trở thành Đại sứ văn hóa Vũng Tàu!
        </p>
      </div>

      {/* User Status Card & Progress Bar */}
      <div className="bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#C2410C] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        {/* Background drum watermark */}
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <DongSonSunburst size={260} color="#FDE047" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Column 1: Level badge & title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border-2 border-amber-300/60 flex items-center justify-center text-amber-300 shadow-inner">
              <ShieldCheck size={36} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-200 font-medium">
                Cấp bậc hiện tại
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {passport.level}
              </h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Đã thu thập {passport.visitedFestivals.length} / 4 con tem di sản
              </p>
            </div>
          </div>

          {/* Column 2: Progress bar to next rank */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-100 font-medium">
              <span>Tiến trình thăng hạng: <strong>{nextLevelName}</strong></span>
              <span className="tabular-nums font-bold text-amber-300">{passport.points} / {targetPoints} điểm</span>
            </div>

            <div className="w-full h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5 border border-amber-300/30">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-700 shadow-xs"
              />
            </div>

            <div className="flex justify-between text-[11px] text-amber-200/80">
              <span>Người mới (0đ)</span>
              <span>Tín đồ lễ hội (200đ)</span>
              <span>Đại sứ văn hóa (500đ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Trang tem (Stamps) | Bộ sưu tập huy hiệu (Badges) | Quét mã QR check-in (Scan) */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="p-1 bg-stone-200/70 rounded-2xl flex gap-1">
          <button
            onClick={() => setActiveTab('stamps')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'stamps'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Trang Tem Lễ Hội ({passport.visitedFestivals.length}/4)
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Huy Hiệu Đã Đạt ({passport.badges.length})
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'scan'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <QrCode size={15} className="text-[#B91C1C]" />
            <span>Quét QR Check-in</span>
          </button>
        </div>
      </div>

      {/* Feedback message banner */}
      {checkinMessage && (
        <div
          className={`p-4 rounded-2xl mb-8 flex items-center justify-between text-xs sm:text-sm transition-all animate-in fade-in ${
            checkinMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
              : checkinMessage.type === 'error'
              ? 'bg-red-50 border border-red-300 text-red-900'
              : 'bg-amber-50 border border-amber-300 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            <span>{checkinMessage.text}</span>
          </div>
          <button
            onClick={() => setCheckinMessage(null)}
            className="text-stone-400 hover:text-stone-700 font-bold ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* =========================================================================
          TAB 1: TRANG TEM HỘ CHIẾU (DIGITAL PASSPORT STAMP PAGES)
         ========================================================================= */}
      {activeTab === 'stamps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FESTIVALS.map((festival, idx) => {
            const isCheckedIn = passport.visitedFestivals.includes(festival.id);
            const badge = passport.badges.find(b => b.festivalId === festival.id);

            return (
              <div
                key={festival.id}
                className="relative bg-[#FAF7F0] border-2 border-[#D97706]/30 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Vintage passport page decorative border */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-[#D97706]/30 rounded-2xl pointer-events-none" />

                {/* Top Stamp Header */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#B45309] block">
                      TRANG TEM SỐ 0{idx + 1}
                    </span>
                    <h4 className="text-lg font-bold font-heading text-stone-900 mt-0.5">
                      {festival.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {festival.location}
                    </p>
                  </div>

                  {/* Stamp Seal Graphic */}
                  <div className="shrink-0 ml-3">
                    {isCheckedIn ? (
                      <div className="relative transform -rotate-12 border-4 border-red-700/80 rounded-full w-20 h-20 flex flex-col items-center justify-center p-1 bg-red-50/70 shadow-xs animate-in zoom-in-50">
                        <span className="text-[8px] font-bold uppercase text-red-800 tracking-wider">
                          ĐÃ CHECK-IN
                        </span>
                        <DongSonSunburst size={26} color="#B91C1C" />
                        <span className="text-[7px] text-red-700 font-bold mt-0.5">
                          {badge?.unlockedAt || '2026'}
                        </span>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-stone-300 rounded-full w-20 h-20 flex flex-col items-center justify-center text-stone-400">
                        <Lock size={20} className="mb-0.5" />
                        <span className="text-[9px] font-medium uppercase tracking-wider">
                          Chưa có tem
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="relative z-10 my-3 text-xs text-stone-600 space-y-2">
                  <p className="line-clamp-2 leading-relaxed">
                    {festival.overview}
                  </p>
                  <div className="flex items-center gap-2 text-stone-700 font-medium">
                    <Calendar size={14} className="text-[#D97706]" />
                    <span>{festival.lunarDate}</span>
                  </div>
                </div>

                {/* Action footer */}
                <div className="relative z-10 pt-4 border-t border-stone-200 mt-2 flex items-center justify-between">
                  {isCheckedIn ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span>Đã hoàn thành (+150đ)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleInstantCheckin(festival.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B91C1C] to-[#C2410C] text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Sparkles size={14} className="text-amber-300" />
                      <span>Đóng dấu ngay (+150đ)</span>
                    </button>
                  )}

                  <span className="text-[11px] text-[#B45309] font-mono">
                    Mã: {festival.secretCheckinCode}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          TAB 2: BỘ SƯU TẬP HUY HIỆU (BADGES COLLECTION)
         ========================================================================= */}
      {activeTab === 'badges' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h3 className="text-lg font-bold font-heading text-stone-900">
              Bộ Huy Hiệu Lễ Hội Vũng Tàu Của Bạn
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Mỗi huy hiệu đại diện cho một dấu ấn văn hóa bạn đã khám phá trọn vẹn tại phố biển.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {FESTIVALS.map(festival => {
              const unlockedBadge = passport.badges.find(b => b.festivalId === festival.id);
              const isUnlocked = !!unlockedBadge;

              return (
                <div
                  key={festival.id}
                  className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] border-[#F59E0B] shadow-sm'
                      : 'bg-stone-50 border-stone-200 opacity-60'
                  }`}
                >
                  <div className="relative my-3">
                    <div
                      className={`w-18 h-18 rounded-2xl flex items-center justify-center shadow-md ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-[#B91C1C] to-[#D97706] text-amber-200'
                          : 'bg-stone-300 text-stone-500'
                      }`}
                    >
                      {isUnlocked ? (
                        <DongSonSunburst size={44} color="#FEF08A" />
                      ) : (
                        <Lock size={28} />
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-sm text-stone-900 font-heading">
                      {festival.badgeTitle}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {festival.shortTitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-200/60 w-full text-[10px]">
                    {isUnlocked ? (
                      <span className="text-emerald-700 font-semibold">
                        Mở khóa: {unlockedBadge.unlockedAt}
                      </span>
                    ) : (
                      <span className="text-stone-400">Chưa mở khóa</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: QUÉT MÃ QR CHECK-IN (QR SCAN SIMULATOR)
         ========================================================================= */}
      {activeTab === 'scan' && (
        <div className="max-w-xl mx-auto bg-[#FAF7F0] rounded-3xl p-6 sm:p-8 border-2 border-[#D97706]/30 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold font-heading text-stone-900">
              Quét Mã QR Tại Lễ Hội
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Nhập mã bí mật hoặc chọn nhanh một lễ hội bên dưới để giả lập quét camera trực tiếp!
            </p>
          </div>

          {/* Camera Viewfinder Simulator */}
          <div className="relative w-full h-56 bg-stone-900 rounded-2xl overflow-hidden mb-6 flex items-center justify-center border-2 border-stone-700">
            {isScanning ? (
              <div className="flex flex-col items-center justify-center text-amber-300 animate-pulse">
                <Camera size={36} className="mb-2" />
                <span className="text-xs font-semibold">Đang nhận diện mã QR lễ hội...</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-8 border-2 border-amber-400/80 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="w-full h-0.5 bg-amber-400 shadow-md animate-pulse" />
                </div>
                <div className="text-center text-stone-400 text-xs px-4">
                  <Camera size={28} className="mx-auto mb-1 text-stone-500" />
                  <span>Căn khung hình vuông vào mã QR đặt tại cổng lễ hội</span>
                </div>
              </>
            )}
          </div>

          {/* Quick Simulation Buttons */}
          <div className="mb-6">
            <span className="text-xs font-bold text-stone-700 block mb-2">
              Hoặc thử nhanh tính năng check-in giả lập:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {FESTIVALS.map(f => (
                <button
                  key={f.id}
                  onClick={() => handleSimulateScanCamera(f.id)}
                  disabled={isScanning}
                  className="p-2.5 rounded-xl bg-white border border-stone-200 text-left text-xs hover:border-[#D97706] hover:bg-[#FEF3C7]/40 transition-colors cursor-pointer"
                >
                  <div className="font-bold text-stone-900 truncate">{f.shortTitle}</div>
                  <div className="text-[10px] text-[#B45309]">Mã: {f.secretCheckinCode}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form manual input */}
          <form onSubmit={handleQrSubmit} className="flex gap-2">
            <input
              type="text"
              value={qrCodeInput}
              onChange={e => setQrCodeInput(e.target.value)}
              placeholder="Nhập mã QR (VD: NGHINHONG2026)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#B91C1C]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              Xác nhận mã
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
