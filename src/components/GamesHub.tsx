import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Calendar,
  RotateCw,
  Trophy,
  ArrowRight,
  ChevronLeft,
  Award,
  Clock,
  Shuffle
} from 'lucide-react';
import {
  GUESS_GAME_ITEMS,
  TRUE_FALSE_QUESTIONS,
  MATCHING_CARDS_DATA,
  TIMELINE_FESTIVALS,
  TimelineItem,
  MatchCard
} from '../data/festivalData';
import { soundEffects } from '../utils/audioEffects';
import { LuckyWheel } from './LuckyWheel';
import { DongSonSunburst } from './DongSonPattern';

interface GamesHubProps {
  onAddPoints: (pts: number) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onAddPoints }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // ================= GAME 1: ĐOÁN LỄ HỘI QUA HÌNH ẢNH / DẤU HIỆU =================
  const [guessIndex, setGuessIndex] = useState<number>(0);
  const [guessSelectedAnswer, setGuessSelectedAnswer] = useState<number | null>(null);
  const [guessAnswered, setGuessAnswered] = useState<boolean>(false);
  const [guessScore, setGuessScore] = useState<number>(0);

  const currentGuess = GUESS_GAME_ITEMS[guessIndex];

  const handleGuessSubmit = (optionIndex: number) => {
    if (guessAnswered) return;
    setGuessSelectedAnswer(optionIndex);
    setGuessAnswered(true);

    if (optionIndex === currentGuess.correctIndex) {
      soundEffects.playFanfare();
      confetti({ particleCount: 60, spread: 60 });
      setGuessScore(prev => prev + 50);
      onAddPoints(50);
    }
  };

  const handleNextGuess = () => {
    if (guessIndex < GUESS_GAME_ITEMS.length - 1) {
      setGuessIndex(prev => prev + 1);
      setGuessSelectedAnswer(null);
      setGuessAnswered(false);
    } else {
      alert(`Bạn đã hoàn thành trò chơi Đoán Lễ Hội với điểm số: ${guessScore} điểm!`);
      setActiveGame(null);
    }
  };

  // ================= GAME 2: ĐÚNG HAY SAI =================
  const [tfIndex, setTfIndex] = useState<number>(0);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [tfAnswered, setTfAnswered] = useState<boolean>(false);
  const [tfScore, setTfScore] = useState<number>(0);

  const currentTf = TRUE_FALSE_QUESTIONS[tfIndex];

  const handleTfSubmit = (choice: boolean) => {
    if (tfAnswered) return;
    setTfSelected(choice);
    setTfAnswered(true);

    if (choice === currentTf.isTrue) {
      soundEffects.playFanfare();
      confetti({ particleCount: 50, spread: 50 });
      setTfScore(prev => prev + 40);
      onAddPoints(40);
    }
  };

  const handleNextTf = () => {
    if (tfIndex < TRUE_FALSE_QUESTIONS.length - 1) {
      setTfIndex(prev => prev + 1);
      setTfSelected(null);
      setTfAnswered(false);
    } else {
      alert(`Xuất sắc! Bạn đã trả lời hết các câu hỏi Đúng/Sai và nhận ${tfScore} điểm!`);
      setActiveGame(null);
    }
  };

  // ================= GAME 3: GHÉP ĐÚNG CẶP (MATCHING MEMORY CARDS) =================
  const [cards, setCards] = useState<Array<MatchCard & { isFlipped: boolean; isMatched: boolean }>>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);

  const initMatchingGame = () => {
    // Shuffle cards
    const shuffled = [...MATCHING_CARDS_DATA]
      .sort(() => Math.random() - 0.5)
      .map(card => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCardIds([]);
    setMoves(0);
    setMatchedPairsCount(0);
  };

  useEffect(() => {
    if (activeGame === 'game-3') {
      initMatchingGame();
    }
  }, [activeGame]);

  const handleCardClick = (cardId: string) => {
    if (flippedCardIds.length === 2) return;
    const clickedCard = cards.find(c => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    soundEffects.playCardFlip();

    const newFlipped = [...flippedCardIds, cardId];
    setFlippedCardIds(newFlipped);

    // Flip visually
    setCards(prev =>
      prev.map(c => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const firstCard = cards.find(c => c.id === newFlipped[0])!;
      const secondCard = clickedCard;

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          soundEffects.playFanfare();
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCardIds([]);
          setMatchedPairsCount(count => {
            const next = count + 1;
            if (next === MATCHING_CARDS_DATA.length / 2) {
              confetti({ particleCount: 100, spread: 80 });
              onAddPoints(150);
            }
            return next;
          });
        }, 500);
      } else {
        // Not matched -> flip back
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCardIds([]);
        }, 1200);
      }
    }
  };

  // ================= GAME 5: TIMELINE LỄ HỘI TRONG NĂM =================
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [isTimelineChecked, setIsTimelineChecked] = useState<boolean>(false);
  const [isTimelineCorrect, setIsTimelineCorrect] = useState<boolean>(false);

  const initTimelineGame = () => {
    // Shuffled version
    const shuffled = [...TIMELINE_FESTIVALS].sort(() => Math.random() - 0.5);
    setTimelineItems(shuffled);
    setIsTimelineChecked(false);
    setIsTimelineCorrect(false);
  };

  useEffect(() => {
    if (activeGame === 'game-5') {
      initTimelineGame();
    }
  }, [activeGame]);

  const moveTimelineItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= timelineItems.length) return;
    const copy = [...timelineItems];
    const [removed] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, removed);
    setTimelineItems(copy);
    setIsTimelineChecked(false);
  };

  const handleCheckTimeline = () => {
    setIsTimelineChecked(true);
    let correct = true;
    for (let i = 0; i < timelineItems.length - 1; i++) {
      if (timelineItems[i].lunarMonthOrder > timelineItems[i + 1].lunarMonthOrder) {
        correct = false;
        break;
      }
    }
    setIsTimelineCorrect(correct);

    if (correct) {
      soundEffects.playFanfare();
      confetti({ particleCount: 90, spread: 80 });
      onAddPoints(120);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
          <Gamepad2 size={16} className="text-[#D97706]" />
          <span>Góc Vui Học Văn Hóa Lễ Hội</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-heading">
          Khu Vực Trò Chơi Dân Gian Số
        </h2>
        <p className="text-sm text-stone-600 mt-2">
          5 trò chơi tương tác hấp dẫn giúp bạn vừa thử thách trí nhớ văn hóa, vừa gom điểm thưởng làm quà!
        </p>
      </div>

      {/* Back button if a game is active */}
      {activeGame && (
        <button
          onClick={() => setActiveGame(null)}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-xs cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span>Quay lại danh sách trò chơi</span>
        </button>
      )}

      {/* =========================================================================
          GAMES DIRECTORY (5 DISTINCT VIBRANT CARDS)
         ========================================================================= */}
      {!activeGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Game 1 */}
          <div className="p-6 bg-gradient-to-br from-[#FEF2F2] to-[#FFF1F2] rounded-3xl border-2 border-[#B91C1C]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#B91C1C] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <ImageIcon size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#991B1B]">
                Trò chơi 01 · Nhận diện
              </span>
              <h3 className="text-lg font-bold font-heading text-stone-900 mt-1 mb-2">
                Đoán Lễ Hội Qua Hình Ảnh
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Quan sát các manh mối trang phục, nghi lễ và món ăn để giải mã chính xác tên lễ hội Vũng Tàu.
              </p>
            </div>
            <div className="pt-5 border-t border-red-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#B91C1C]">+50 điểm / câu</span>
              <button
                onClick={() => setActiveGame('game-1')}
                className="px-4 py-2 rounded-xl bg-[#B91C1C] text-white text-xs font-bold hover:bg-[#991B1B] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Chơi ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card Game 2 */}
          <div className="p-6 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-3xl border-2 border-[#0284C7]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <HelpCircle size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0369A1]">
                Trò chơi 02 · Kiến thức
              </span>
              <h3 className="text-lg font-bold font-heading text-stone-900 mt-1 mb-2">
                Đúng Hay Sai (True / False)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Thử tài hiểu biết với loạt câu hỏi trắc nghiệm nhanh Đúng/Sai về phong tục và sự thật lịch sử thú vị.
              </p>
            </div>
            <div className="pt-5 border-t border-sky-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0284C7]">+40 điểm / câu</span>
              <button
                onClick={() => setActiveGame('game-2')}
                className="px-4 py-2 rounded-xl bg-[#0284C7] text-white text-xs font-bold hover:bg-[#0369A1] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Chơi ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card Game 3 */}
          <div className="p-6 bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] rounded-3xl border-2 border-[#D97706]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Layers size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309]">
                Trò chơi 03 · Trí nhớ
              </span>
              <h3 className="text-lg font-bold font-heading text-stone-900 mt-1 mb-2">
                Ghép Đúng Cặp (Memory Match)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Lật các quân bài bí ẩn để ghép nối tên lễ hội với biểu tượng văn hóa đặc trưng tương ứng.
              </p>
            </div>
            <div className="pt-5 border-t border-amber-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#D97706]">+150 điểm thưởng</span>
              <button
                onClick={() => setActiveGame('game-3')}
                className="px-4 py-2 rounded-xl bg-[#D97706] text-white text-xs font-bold hover:bg-[#B45309] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Chơi ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card Game 4 */}
          <div className="p-6 bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-3xl border-2 border-[#059669]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#047857]">
                Trò chơi 04 · May mắn
              </span>
              <h3 className="text-lg font-bold font-heading text-stone-900 mt-1 mb-2">
                Vòng Quay May Mắn Kiến Thức
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Quay bánh xe số học hỏi các sự thật di sản kỳ thú và nhận túi lộc may mắn từ Thần Nam Hải.
              </p>
            </div>
            <div className="pt-5 border-t border-emerald-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#059669]">Lên đến +200 điểm</span>
              <button
                onClick={() => setActiveGame('game-4')}
                className="px-4 py-2 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-[#047857] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Chơi ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Card Game 5 */}
          <div className="p-6 bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] rounded-3xl border-2 border-[#9333EA]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#9333EA] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Calendar size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7E22CE]">
                Trò chơi 05 · Thời gian
              </span>
              <h3 className="text-lg font-bold font-heading text-stone-900 mt-1 mb-2">
                Timeline Lễ Hội Trong Năm
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Kéo thả sắp xếp các lễ hội theo đúng trình tự lịch Âm từ đầu năm đến cuối năm để mở khóa dòng thời gian chuẩn.
              </p>
            </div>
            <div className="pt-5 border-t border-purple-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#9333EA]">+120 điểm thưởng</span>
              <button
                onClick={() => setActiveGame('game-5')}
                className="px-4 py-2 rounded-xl bg-[#9333EA] text-white text-xs font-bold hover:bg-[#7E22CE] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Chơi ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          GAME 1 ARENA: ĐOÁN LỄ HỘI QUA HÌNH ẢNH / MANH MỐI
         ========================================================================= */}
      {activeGame === 'game-1' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#B91C1C]/20 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#991B1B]">
              Câu {guessIndex + 1} / {GUESS_GAME_ITEMS.length}
            </span>
            <span className="text-xs font-bold text-amber-700">
              Điểm đạt được: {guessScore}đ
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold font-heading text-stone-900 mb-4">
            Dựa vào các manh mối sau, đây là lễ hội nào?
          </h3>

          {/* Clues Box */}
          <div className="p-4 bg-[#FEF3C7]/40 rounded-2xl border border-amber-200/60 mb-6 space-y-2">
            {currentGuess.clues.map((clue, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-800">
                <span className="w-4 h-4 rounded-full bg-[#B91C1C] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{clue}</span>
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="space-y-2.5 mb-6">
            {currentGuess.options.map((option, idx) => {
              let btnClass = 'border-stone-200 hover:border-[#B91C1C] hover:bg-red-50/50 text-stone-800';
              if (guessAnswered) {
                if (idx === currentGuess.correctIndex) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (idx === guessSelectedAnswer) {
                  btnClass = 'border-red-500 bg-red-50 text-red-900';
                } else {
                  btnClass = 'border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleGuessSubmit(idx)}
                  disabled={guessAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{option}</span>
                  {guessAnswered && idx === currentGuess.correctIndex && (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  )}
                  {guessAnswered && idx === guessSelectedAnswer && idx !== currentGuess.correctIndex && (
                    <XCircle size={18} className="text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {guessAnswered && (
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 mb-6 text-xs sm:text-sm text-stone-700 animate-in fade-in">
              <span className="font-bold text-stone-900 block mb-1">Giải thích văn hóa:</span>
              <p>{currentGuess.explanation}</p>
            </div>
          )}

          {guessAnswered && (
            <button
              onClick={handleNextGuess}
              className="w-full py-3 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {guessIndex < GUESS_GAME_ITEMS.length - 1 ? 'Câu kế tiếp' : 'Hoàn thành thử thách'}
            </button>
          )}
        </div>
      )}

      {/* =========================================================================
          GAME 2 ARENA: ĐÚNG HAY SAI
         ========================================================================= */}
      {activeGame === 'game-2' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0284C7]/20 shadow-md">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>Câu hỏi {tfIndex + 1} / {TRUE_FALSE_QUESTIONS.length}</span>
              <span className="font-bold text-sky-700">Điểm: {tfScore}đ</span>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${((tfIndex + 1) / TRUE_FALSE_QUESTIONS.length) * 100}%` }}
                className="h-full bg-[#0284C7] rounded-full transition-all"
              />
            </div>
          </div>

          <div className="p-6 bg-[#F0F9FF] rounded-2xl border border-sky-200 mb-6 text-center">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed font-heading">
              "{currentTf.question}"
            </h3>
          </div>

          {/* True / False Big Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleTfSubmit(true)}
              disabled={tfAnswered}
              className={`py-4 rounded-2xl font-bold text-sm sm:text-base transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                tfAnswered
                  ? currentTf.isTrue
                    ? 'bg-emerald-600 text-white'
                    : tfSelected === true
                    ? 'bg-red-500 text-white'
                    : 'bg-stone-100 text-stone-400'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
              }`}
            >
              <CheckCircle2 size={24} />
              <span>ĐÚNG</span>
            </button>

            <button
              onClick={() => handleTfSubmit(false)}
              disabled={tfAnswered}
              className={`py-4 rounded-2xl font-bold text-sm sm:text-base transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                tfAnswered
                  ? !currentTf.isTrue
                    ? 'bg-emerald-600 text-white'
                    : tfSelected === false
                    ? 'bg-red-500 text-white'
                    : 'bg-stone-100 text-stone-400'
                  : 'bg-red-50 hover:bg-red-100 text-red-800 border-2 border-red-300'
              }`}
            >
              <XCircle size={24} />
              <span>SAI</span>
            </button>
          </div>

          {/* Explanation */}
          {tfAnswered && (
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 mb-6 text-xs sm:text-sm text-stone-700 animate-in fade-in space-y-1.5">
              <div className="font-bold text-stone-900">
                {tfSelected === currentTf.isTrue ? '🎉 Bạn trả lời chính xác!' : '💡 Chưa chính xác!'}
              </div>
              <p>{currentTf.explanation}</p>
              <p className="text-[#0369A1] font-medium pt-1 border-t border-stone-200 mt-1">
                Góc nhìn thú vị: {currentTf.funFact}
              </p>
            </div>
          )}

          {tfAnswered && (
            <button
              onClick={handleNextTf}
              className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {tfIndex < TRUE_FALSE_QUESTIONS.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành và lưu điểm'}
            </button>
          )}
        </div>
      )}

      {/* =========================================================================
          GAME 3 ARENA: GHÉP ĐÚNG CẶP (MEMORY MATCH)
         ========================================================================= */}
      {activeGame === 'game-3' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D97706]/20 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
            <div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                Ghép Đôi Thẻ Bài Lễ Hội
              </h3>
              <p className="text-xs text-stone-500">
                Lật 2 quân bài trùng khớp về cùng 1 lễ hội để ghi điểm!
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-stone-600">Số lượt: {moves}</span>
              <span className="text-[#B45309]">Đã ghép: {matchedPairsCount} / 4 cặp</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {cards.map(card => {
              const showFront = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`h-36 rounded-2xl cursor-pointer p-3 border-2 transition-all flex flex-col items-center justify-center text-center select-none ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-inner'
                      : showFront
                      ? 'bg-[#FEF3C7] border-[#D97706] text-stone-900 shadow-md scale-102'
                      : 'bg-gradient-to-br from-[#B91C1C] to-[#991B1B] border-amber-300/40 text-amber-200 hover:brightness-110 shadow-xs'
                  }`}
                >
                  {showFront ? (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#B45309]">
                        {card.type === 'festival' ? 'Tên Lễ Hội' : 'Biểu Tượng'}
                      </span>
                      <h5 className="font-bold text-xs sm:text-sm line-clamp-2">
                        {card.content}
                      </h5>
                      <p className="text-[10px] text-stone-500 line-clamp-2">
                        {card.description}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <DongSonSunburst size={36} color="#FDE047" />
                      <span className="text-[10px] font-bold tracking-wider mt-1 text-amber-100 uppercase">
                        Vũng Tàu
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={initMatchingGame}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
            >
              <RotateCw size={14} />
              <span>Chơi lại ván mới</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          GAME 4 ARENA: VÒNG QUAY MAY MẮN KIẾN THỨC
         ========================================================================= */}
      {activeGame === 'game-4' && (
        <div className="max-w-xl mx-auto">
          <LuckyWheel onAddPoints={onAddPoints} />
        </div>
      )}

      {/* =========================================================================
          GAME 5 ARENA: TIMELINE LỄ HỘI TRONG NĂM
         ========================================================================= */}
      {activeGame === 'game-5' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#9333EA]/20 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
            <div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                Sắp Xếp Timeline Lễ Hội Trong Năm
              </h3>
              <p className="text-xs text-stone-500">
                Nhấn các nút mũi tên lên/xuống để sắp xếp theo đúng thứ tự Âm lịch (từ tháng Giêng/Hai đến cuối năm).
              </p>
            </div>
            <button
              onClick={initTimelineGame}
              className="p-2 rounded-lg hover:bg-stone-100 text-stone-600"
              title="Xáo trộn lại"
            >
              <Shuffle size={18} />
            </button>
          </div>

          {/* Drag / Move card rows */}
          <div className="space-y-3 mb-6">
            {timelineItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#FAF7F0] border border-stone-200 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-[#9333EA] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-stone-900">{item.title}</h5>
                    <p className="text-xs text-[#7E22CE] font-medium">{item.lunarDateText}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => moveTimelineItem(idx, idx - 1)}
                    disabled={idx === 0}
                    className="px-2 py-1 bg-white hover:bg-stone-100 disabled:opacity-30 rounded border border-stone-200 text-[11px] font-bold text-stone-700"
                  >
                    ▲ Lên
                  </button>
                  <button
                    onClick={() => moveTimelineItem(idx, idx + 1)}
                    disabled={idx === timelineItems.length - 1}
                    className="px-2 py-1 bg-white hover:bg-stone-100 disabled:opacity-30 rounded border border-stone-200 text-[11px] font-bold text-stone-700"
                  >
                    ▼ Xuống
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Verification check feedback */}
          {isTimelineChecked && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm mb-6 ${
                isTimelineCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <div className="font-bold mb-1">
                {isTimelineCorrect
                  ? '🎉 Hoàn toàn chính xác! +120 điểm đã được trao!'
                  : '⚠️ Thứ tự chưa đúng! Hãy nhớ: Dinh Cô & Kỳ Yên (Tháng 2 Âm) -> Nghinh Ông (Tháng 8 Âm) -> Miếu Bà (Tháng 10 Âm).'}
              </div>
            </div>
          )}

          <button
            onClick={handleCheckTimeline}
            className="w-full py-3 rounded-xl bg-[#9333EA] hover:bg-[#7E22CE] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Kiểm tra thứ tự Timeline
          </button>
        </div>
      )}
    </div>
  );
};
