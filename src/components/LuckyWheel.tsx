import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, HelpCircle, CheckCircle2, XCircle, Award, Volume2, VolumeX, X } from 'lucide-react';
import { LUCKY_WHEEL_SECTORS, WheelSector } from '../data/festivalData';
import { soundEffects } from '../utils/audioEffects';
import { DongSonSunburst } from './DongSonPattern';

interface LuckyWheelProps {
  onAddPoints?: (pts: number) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const LuckyWheel: React.FC<LuckyWheelProps> = ({
  onAddPoints,
  isModal = false,
  onClose,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSector, setSelectedSector] = useState<WheelSector | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectors = LUCKY_WHEEL_SECTORS;
  const numSectors = sectors.length;
  const arcSize = (2 * Math.PI) / numSectors;

  // Draw the wheel onto canvas
  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2 - 12;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw outer golden ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#D97706';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#78350F';
    ctx.fill();

    // Draw outer studs/bulbs
    const numStuds = 24;
    for (let i = 0; i < numStuds; i++) {
      const angle = (i * 2 * Math.PI) / numStuds;
      const sx = centerX + (radius + 6) * Math.cos(angle);
      const sy = centerY + (radius + 6) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#FEF08A' : '#FDE68A';
      ctx.fill();
    }

    // Draw sectors
    sectors.forEach((sector, i) => {
      const startAngle = i * arcSize;
      const endAngle = startAngle + arcSize;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sector.color;
      ctx.fill();

      // Sector border
      ctx.strokeStyle = '#FDE68A';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Text label inside sector
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = sector.textColor;
      ctx.font = 'bold 12px "Be Vietnam Pro", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;
      ctx.fillText(sector.label, radius - 20, 4);
      ctx.restore();
    });

    // Center hub (Dong Son motif core)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, 2 * Math.PI);
    ctx.fillStyle = '#9A3412';
    ctx.fill();
    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#B91C1C';
    ctx.fill();

    // Central star center
    ctx.fillStyle = '#FEF08A';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText('QUAY', centerX, centerY);
  };

  useEffect(() => {
    drawWheel();
  }, []);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setSelectedSector(null);
    setShowResultModal(false);
    setSelectedAnswer(null);
    setIsAnswered(false);

    // Pick random target sector
    const randomIndex = Math.floor(Math.random() * numSectors);
    const targetSector = sectors[randomIndex];

    // Calculate rotation angle so target sector aligns with the top pointer (at -90 deg / 270 deg)
    // Sector i center is at: i * arcSize + arcSize / 2
    // Top pointer is at -Math.PI / 2 (or 270 deg)
    const sectorAngleDeg = (randomIndex * 360) / numSectors + 360 / numSectors / 2;
    const pointerOffsetDeg = 270;
    const targetOffset = (pointerOffsetDeg - sectorAngleDeg + 360) % 360;

    const fullSpins = 5 + Math.floor(Math.random() * 3); // 5 to 7 full rotations
    const totalRotation = rotation + fullSpins * 360 + targetOffset - (rotation % 360);

    setRotation(totalRotation);

    // Play tick sound periodically during spin
    if (soundEnabled) {
      let tickCount = 0;
      const interval = setInterval(() => {
        soundEffects.playTick();
        tickCount++;
        if (tickCount > 25) {
          clearInterval(interval);
        }
      }, 140);
    }

    // Spin animation duration: 4.5s
    setTimeout(() => {
      setSpinning(false);
      setSelectedSector(targetSector);
      setShowResultModal(true);

      if (soundEnabled) {
        soundEffects.playFanfare();
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B91C1C', '#D97706', '#0284C7', '#FEF08A'],
      });

      // Auto add points if pure points sector
      if (targetSector.type === 'points' && onAddPoints) {
        onAddPoints(targetSector.points);
      }
    }, 4500);
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    if (isAnswered || !selectedSector || selectedSector.type !== 'question') return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    const correct = optionIndex === selectedSector.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (soundEnabled) soundEffects.playFanfare();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
      });
      if (onAddPoints) {
        onAddPoints(selectedSector.points);
      }
    }
  };

  const handleClaimFactPoints = () => {
    if (selectedSector && selectedSector.type === 'fact' && onAddPoints && !isAnswered) {
      setIsAnswered(true);
      onAddPoints(selectedSector.points);
      if (soundEnabled) soundEffects.playFanfare();
      confetti({
        particleCount: 40,
        spread: 50,
      });
    }
  };

  return (
    <div className={`relative ${isModal ? 'p-4 sm:p-6' : 'p-6 sm:p-8'} bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7]/60 rounded-2xl border border-[#F59E0B]/30 shadow-sm overflow-hidden`}>
      {/* Decorative Dong Son background watermark */}
      <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none">
        <DongSonSunburst size={240} color="#B45309" />
      </div>

      {/* Modal close button */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors z-10"
        >
          <X size={20} />
        </button>
      )}

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-[#92400E] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={14} className="text-[#D97706]" />
          <span>Vòng quay may mắn kiến thức</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#78350F] tracking-tight font-heading">
          Khám phá sự thật Lễ hội Vũng Tàu
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Quay ngẫu nhiên để giải mã bí mật văn hóa và tích lũy điểm thưởng vào Hộ chiếu số!
        </p>

        {/* Audio sound toggle */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-500 hover:text-stone-700 transition-colors"
          >
            {soundEnabled ? <Volume2 size={14} className="text-[#D97706]" /> : <VolumeX size={14} />}
            <span>Âm thanh: {soundEnabled ? 'Bật' : 'Tắt'}</span>
          </button>
        </div>
      </div>

      {/* Wheel Stage */}
      <div className="relative flex flex-col items-center justify-center my-4">
        {/* Pointer / Flapper at top */}
        <div className="relative z-20 -mb-5 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-[#B91C1C] drop-shadow-md" />
          <div className="w-3 h-3 rounded-full bg-amber-300 border-2 border-[#78350F] -mt-1" />
        </div>

        {/* Rotating Wheel Container */}
        <div className="relative p-2 rounded-full bg-gradient-to-tr from-[#9A3412] via-[#D97706] to-[#F59E0B] shadow-xl">
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4.5s cubic-bezier(0.12, 0.8, 0.2, 1)' : 'none',
            }}
            className="rounded-full overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] cursor-pointer"
              onClick={spinWheel}
            />
          </div>
        </div>

        {/* Action Spin Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={spinWheel}
            disabled={spinning}
            className={`px-8 py-3 rounded-xl font-bold text-sm sm:text-base text-white shadow-md transition-all cursor-pointer ${
              spinning
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#B91C1C] via-[#C2410C] to-[#D97706] hover:brightness-110 hover:shadow-lg active:scale-98'
            }`}
          >
            {spinning ? 'Bánh xe đang quay...' : 'QUAY NGAY BÂY GIỜ'}
          </button>
        </div>
      </div>

      {/* Result Modal / Overlay */}
      {showResultModal && selectedSector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-[#FAF7F0] rounded-2xl border-2 border-[#D97706]/40 shadow-2xl p-6 sm:p-7 overflow-hidden">
            {/* Header ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedSector.color }}
                />
                <span className="text-xs uppercase tracking-widest font-bold text-[#9A3412]">
                  {selectedSector.type === 'question' && 'Câu hỏi thử thách'}
                  {selectedSector.type === 'fact' && 'Góc nhìn di sản'}
                  {selectedSector.type === 'points' && 'Phần thưởng may mắn'}
                </span>
              </div>
              <button
                onClick={() => setShowResultModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Body */}
            <h4 className="text-lg sm:text-xl font-bold text-stone-900 font-heading mb-2">
              {selectedSector.title}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed mb-5">
              {selectedSector.content}
            </p>

            {/* Type Question: 4 Options */}
            {selectedSector.type === 'question' && selectedSector.options && (
              <div className="space-y-2.5 mb-5">
                {selectedSector.options.map((option, idx) => {
                  let buttonStyle = 'border-stone-200 hover:border-[#D97706] hover:bg-[#FEF3C7]/40 text-stone-800';

                  if (isAnswered) {
                    if (idx === selectedSector.correctAnswer) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (idx === selectedAnswer) {
                      buttonStyle = 'border-red-500 bg-red-50 text-red-900';
                    } else {
                      buttonStyle = 'border-stone-200 text-stone-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && idx === selectedSector.correctAnswer && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isAnswered && idx === selectedAnswer && idx !== selectedSector.correctAnswer && (
                        <XCircle size={18} className="text-red-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Explanation & Result Badge */}
            {isAnswered && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm mb-4 animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span>Chính xác! +{selectedSector.points} điểm vào Hộ chiếu</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle size={16} className="text-amber-600" />
                      <span>Chưa chính xác, nhưng đừng nản lòng!</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {selectedSector.explanation}
                </p>
              </div>
            )}

            {/* Fact Explanation if type === 'fact' */}
            {selectedSector.type === 'fact' && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-700 mb-5">
                <span className="font-semibold text-[#9A3412] block mb-1">Ý nghĩa văn hóa:</span>
                {selectedSector.explanation}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {selectedSector.type === 'fact' && !isAnswered && (
                <button
                  onClick={handleClaimFactPoints}
                  className="px-4 py-2 rounded-lg bg-[#D97706] text-white text-xs font-semibold hover:bg-[#B45309] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Award size={15} />
                  <span>Nhận +{selectedSector.points} điểm</span>
                </button>
              )}

              <button
                onClick={() => setShowResultModal(false)}
                className="px-4 py-2 rounded-lg bg-stone-200 text-stone-800 text-xs font-semibold hover:bg-stone-300 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
