import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  ChevronRight,
  Compass,
  CornerDownLeft
} from 'lucide-react';
import { VietnameseLantern, DongSonSunburst } from './DongSonPattern';
import { FESTIVALS } from '../data/festivalData';
import { VoiceNarrator } from '../utils/audioEffects';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  suggestionLink?: {
    festivalId: string;
    label: string;
  };
}

interface ChatbotProps {
  onSelectFestival?: (festId: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onSelectFestival }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'bot',
      text: 'Xin chào! Tôi là Bé Lân - Sứ giả văn hóa Lễ hội Vũng Tàu. Tôi có thể giải đáp lịch trình, nghi thức cổ truyền hoặc gợi ý lễ hội phù hợp nhất với sở thích của bạn. Bạn muốn khám phá điều gì hôm nay?',
      time: 'Bây giờ',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'Lễ hội Nghinh Ông diễn ra khi nào?',
    'Gợi ý lễ hội cho gia đình có trẻ nhỏ',
    'Lễ hội nào có con đường đi bộ qua biển?',
    'Món ngon đặc sản gần Đình Thắng Tam',
  ];

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateAnswer = (query: string): { text: string; festivalId?: string } => {
    const q = query.toLowerCase();

    // 1. Nghinh Ong
    if (q.includes('nghinh ông') || q.includes('cá ông') || q.includes('cá voi') || q.includes('tháng 8') || q.includes('bãi trước')) {
      return {
        text: 'Lễ hội Nghinh Ông Thắng Tam diễn ra từ ngày 15 đến 18 tháng 8 Âm lịch hằng năm tại Đình thần Thắng Tam. Đây là lễ hội lớn nhất của ngư dân Vũng Tàu tôn vinh Cá Ông cứu nạn trên biển, có lễ rước thuyền rồng hoành tráng trên biển và múa lân, hát bội rực rỡ.',
        festivalId: 'nghinh-ong-thang-tam',
      };
    }

    // 2. Dinh Co
    if (q.includes('dinh cô') || q.includes('long hải') || q.includes('bà cô') || q.includes('tháng 2') || q.includes('hoa đăng')) {
      return {
        text: 'Lễ hội Dinh Cô Long Hải diễn ra từ ngày 10 đến 12 tháng 2 Âm lịch tại bờ biển thị trấn Long Hải. Lễ hội tưởng nhớ Bà Cô linh thiêng, nổi bật với lễ rước kiệu hoa rực rỡ bên bờ cát và đêm hội thả hoa đăng lung linh trên sóng biển.',
        festivalId: 'dinh-co-long-hai',
      };
    }

    // 3. Mieu Ba Ngu Hanh & Hon Ba
    if (q.includes('miếu bà') || q.includes('ngũ hành') || q.includes('hòn bà') || q.includes('thủy triều') || q.includes('đi bộ') || q.includes('múa bóng rỗi')) {
      return {
        text: 'Lễ hội Miếu Bà Ngũ Hành diễn ra từ 16 đến 18 tháng 10 Âm lịch tại Phường 2, Vũng Tàu. Điểm đặc sắc nhất là lối mòn đá tự nhiên lộ ra khi thủy triều rút để du khách đi bộ ra đảo Hòn Bà, cùng nghệ thuật diễn xướng múa bóng rỗi điêu luyện!',
        festivalId: 'mieu-ba-ngu-hanh',
      };
    }

    // 4. Ky Yen
    if (q.includes('kỳ yên') || q.includes('cầu an') || q.includes('thành hoàng') || q.includes('ba làng')) {
      return {
        text: 'Lễ hội Kỳ Yên Đình thần Thắng Tam diễn ra vào ngày 17 đến 20 tháng 2 Âm lịch. Đây là đại lễ cầu an truyền thống của làng xã Nam Bộ, tưởng nhớ ba vị chỉ huy tiền hiền lập nên ba làng Thắng thuở vua Gia Long.',
        festivalId: 'ky-yen-thang-tam',
      };
    }

    // 5. Gợi ý theo sở thích: Gia đình / trẻ em
    if (q.includes('gia đình') || q.includes('trẻ em') || q.includes('trẻ nhỏ')) {
      return {
        text: 'Với chuyến đi gia đình có trẻ em, Bé Lân gợi ý bạn đến Lễ hội Nghinh Ông Thắng Tam (tháng 8 Âm lịch) để các bé xem múa lân sư rồng sôi động, hoặc Lễ hội Dinh Cô Long Hải với bờ cát thoai thoải và hoạt động thả diều nghệ thuật lộng gió!',
        festivalId: 'nghinh-ong-thang-tam',
      };
    }

    // 6. Gợi ý theo sở thích: Ẩm thực
    if (q.includes('ăn gì') || q.includes('món ngon') || q.includes('ẩm thực') || q.includes('bánh khọt')) {
      return {
        text: 'Khi trẩy hội Vũng Tàu, bạn không thể bỏ qua: Bánh khọt tôm giòn rụm (quanh đường Hoàng Hoa Thám gần Đình Thắng Tam), gỏi cá mai Bãi Trước, mực một nắng nướng Long Hải và chả cá thu thơm nức!',
      };
    }

    // 7. Trang phục / Lưu ý
    if (q.includes('trang phục') || q.includes('mặc gì') || q.includes('lưu ý')) {
      return {
        text: 'Khi bước vào chánh điện các đền miếu (Đình Thắng Tam, Dinh Cô, Miếu Bà), bạn nên chọn trang phục lịch sự, kín đáo (áo có tay, quần dài). Nếu tham gia rước lễ bãi biển, hãy chuẩn bị nón rộng vành, kem chống nắng và giày dép dễ di chuyển trên cát.',
      };
    }

    // Default polite answer
    return {
      text: 'Bé Lân đã ghi nhận câu hỏi của bạn! Bạn có thể hỏi cụ thể hơn về lịch tổ chức 4 lễ hội lớn (Nghinh Ông, Dinh Cô, Miếu Bà Ngũ Hành, Kỳ Yên), các trò chơi dân gian hoặc cách tích điểm nhận huy hiệu Hộ chiếu số nhé!',
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: 'Vừa xong',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        time: 'Vừa xong',
        suggestionLink: response.festivalId
          ? {
              festivalId: response.festivalId,
              label: 'Xem chi tiết lễ hội này',
            }
          : undefined,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleSpeakBotMessage = (text: string) => {
    VoiceNarrator.speak(text);
  };

  return (
    <>
      {/* Floating Button Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#B91C1C] via-[#C2410C] to-[#D97706] text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-amber-300 animate-float-lantern"
            aria-label="Mở trợ lý chatbot văn hóa"
          >
            <VietnameseLantern size={26} color="#B91C1C" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-white" />
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[390px] h-[540px] max-h-[85vh] bg-[#FAF7F0] rounded-3xl border-2 border-[#D97706]/40 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Top Bar */}
          <div className="p-4 bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#C2410C] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-300/20 border border-amber-300/50 flex items-center justify-center text-amber-300">
                <VietnameseLantern size={22} color="#FEF08A" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm font-heading">Bé Lân Văn Hóa</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-amber-200">
                  Trợ lý số lễ hội Vũng Tàu
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                VoiceNarrator.stop();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#FEF3C7]/60 border-b border-[#F59E0B]/30 flex gap-2 overflow-x-auto scrollbar-none text-[11px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white text-[#92400E] border border-amber-300/60 font-medium hover:bg-amber-100 whitespace-nowrap cursor-pointer transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#B91C1C] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={15} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#B91C1C] text-white rounded-tr-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Suggestion jump link */}
                  {msg.suggestionLink && onSelectFestival && (
                    <button
                      onClick={() => {
                        onSelectFestival(msg.suggestionLink!.festivalId);
                        setIsOpen(false);
                      }}
                      className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-[#B91C1C] hover:underline cursor-pointer"
                    >
                      <Compass size={13} />
                      <span>{msg.suggestionLink.label}</span>
                      <ChevronRight size={13} />
                    </button>
                  )}

                  {/* Audio voice playback */}
                  {msg.sender === 'bot' && (
                    <div className="mt-1.5 pt-1 flex justify-end">
                      <button
                        onClick={() => handleSpeakBotMessage(msg.text)}
                        className="text-stone-400 hover:text-[#D97706] transition-colors p-1"
                        title="Nghe đọc câu trả lời này"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-stone-400 text-xs italic">
                <Bot size={15} className="text-[#B91C1C]" />
                <span>Bé Lân đang soạn câu trả lời...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Hỏi Bé Lân về lễ hội Vũng Tàu..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#B91C1C]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] disabled:opacity-40 text-white transition-colors cursor-pointer"
              aria-label="Gửi tin nhắn"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
