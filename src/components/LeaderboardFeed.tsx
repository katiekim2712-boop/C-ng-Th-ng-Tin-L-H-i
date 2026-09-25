import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Heart,
  MessageSquare,
  Share2,
  PlusCircle,
  Sparkles,
  Compass,
  CheckCircle2,
  X,
  Camera
} from 'lucide-react';
import {
  MOCK_LEADERBOARD,
  INITIAL_COMMUNITY_POSTS,
  LeaderboardUser,
  FeedPost,
  FESTIVALS
} from '../data/festivalData';
import { UserPassportData } from '../utils/userStorage';
import { DongSonSunburst } from './DongSonPattern';

interface LeaderboardFeedProps {
  passport: UserPassportData;
}

export const LeaderboardFeed: React.FC<LeaderboardFeedProps> = ({ passport }) => {
  const [leaderboardTab, setLeaderboardTab] = useState<'leaderboard' | 'feed'>('leaderboard');
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_COMMUNITY_POSTS);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);

  // New post form state
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('#NghinhOngVungTau');

  // Top 3 users and remaining
  const top1 = MOCK_LEADERBOARD[0];
  const top2 = MOCK_LEADERBOARD[1];
  const top3 = MOCK_LEADERBOARD[2];
  const restUsers = MOCK_LEADERBOARD.slice(3);

  const handleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: FeedPost = {
      id: `p-${Date.now()}`,
      author: newPostAuthor.trim() || 'Du khách Vũng Tàu',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      timeAgo: 'Vừa xong',
      festivalTag: newPostTag,
      content: newPostContent.trim(),
      image: FESTIVALS[0].coverImage,
      likes: 1,
      isLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowPostModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
          <Trophy size={16} className="text-[#D97706]" />
          <span>Vinh danh & Kết nối Cộng đồng</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-heading">
          Bảng Xếp Hạng & Góc Chia Sẻ Trải Nghiệm
        </h2>
        <p className="text-sm text-stone-600 mt-2">
          Tuyên dương các "Nhà thám hiểm lễ hội của tháng" và cùng hòa chung cảm xúc qua những bức ảnh, câu chuyện trẩy hội tuyệt đẹp.
        </p>
      </div>

      {/* Main Switcher */}
      <div className="flex justify-center mb-8">
        <div className="p-1 bg-stone-200/70 rounded-2xl flex gap-1">
          <button
            onClick={() => setLeaderboardTab('leaderboard')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              leaderboardTab === 'leaderboard'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Trophy size={16} className="text-[#D97706]" />
            <span>Bảng Vinh Danh Top Khám Phá</span>
          </button>
          <button
            onClick={() => setLeaderboardTab('feed')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              leaderboardTab === 'feed'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Camera size={16} className="text-[#B91C1C]" />
            <span>Khoảnh Khắc Lễ Hội ({posts.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: LEADERBOARD & PODIUM
         ========================================================================= */}
      {leaderboardTab === 'leaderboard' && (
        <div className="space-y-10">
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-6">
            {/* Rank 2 (Silver) */}
            <div className="order-2 md:order-1 bg-gradient-to-t from-stone-200/80 to-white rounded-3xl p-6 border border-stone-300 text-center shadow-sm flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-slate-300 shadow-md"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-300 text-slate-800 text-[10px] font-bold">
                  Hạng 2
                </span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-heading">{top2.name}</h4>
              <p className="text-xs text-[#0284C7] font-medium">{top2.level}</p>
              <div className="mt-3 py-2 px-4 rounded-xl bg-white/80 border border-stone-200 w-full">
                <span className="text-lg font-extrabold text-stone-800 tabular-nums">{top2.points}</span>
                <span className="text-xs text-stone-500 ml-1">điểm</span>
              </div>
              <p className="text-[11px] text-stone-500 italic mt-3 line-clamp-2">
                "{top2.quote}"
              </p>
            </div>

            {/* Rank 1 (Gold - Elevated) */}
            <div className="order-1 md:order-2 bg-gradient-to-t from-amber-100 via-amber-50 to-white rounded-3xl p-7 border-2 border-amber-400 text-center shadow-lg flex flex-col items-center relative transform md:-translate-y-4">
              <div className="absolute -top-4 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                <Sparkles size={14} />
                <span>QUÁN QUÂN THÁNG</span>
              </div>
              <div className="relative my-3">
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-md"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black">
                  Hạng 1
                </span>
              </div>
              <h4 className="font-bold text-lg text-stone-900 font-heading">{top1.name}</h4>
              <p className="text-xs text-[#B45309] font-semibold">{top1.level}</p>
              <div className="mt-3 py-2 px-5 rounded-xl bg-amber-200/70 border border-amber-300 w-full">
                <span className="text-2xl font-black text-[#92400E] tabular-nums">{top1.points}</span>
                <span className="text-xs text-[#92400E] ml-1 font-bold">điểm</span>
              </div>
              <p className="text-xs text-stone-600 italic mt-3">
                "{top1.quote}"
              </p>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="order-3 bg-gradient-to-t from-amber-50 to-white rounded-3xl p-6 border border-amber-200 text-center shadow-sm flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-600/40 shadow-md"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-700 text-white text-[10px] font-bold">
                  Hạng 3
                </span>
              </div>
              <h4 className="font-bold text-base text-stone-900 font-heading">{top3.name}</h4>
              <p className="text-xs text-[#D97706] font-medium">{top3.level}</p>
              <div className="mt-3 py-2 px-4 rounded-xl bg-white/80 border border-stone-200 w-full">
                <span className="text-lg font-extrabold text-stone-800 tabular-nums">{top3.points}</span>
                <span className="text-xs text-stone-500 ml-1">điểm</span>
              </div>
              <p className="text-[11px] text-stone-500 italic mt-3 line-clamp-2">
                "{top3.quote}"
              </p>
            </div>
          </div>

          {/* Current User's Real-Time Standing Highlight */}
          <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border-2 border-[#F59E0B] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B91C1C] text-white font-bold flex items-center justify-center text-sm">
                Bạn
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
                  Hạng của bạn (Đang cập nhật)
                </span>
                <h5 className="font-bold text-sm text-stone-900">
                  {passport.level} · Đã tích lũy
                </h5>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-[#92400E] tabular-nums">{passport.points}</span>
              <span className="text-xs text-[#92400E] ml-1">điểm</span>
            </div>
          </div>

          {/* Ranked List table (4-10) */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-600 flex justify-between">
              <span>Hạng & Người tham gia</span>
              <span>Điểm & Huy hiệu</span>
            </div>
            <div className="divide-y divide-stone-100">
              {restUsers.map(user => (
                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-bold text-sm text-stone-500 tabular-nums">
                      {user.rank}
                    </span>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <div className="font-bold text-sm text-stone-900">{user.name}</div>
                      <div className="text-[11px] text-stone-500">{user.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-stone-900 tabular-nums">
                      {user.points} <span className="text-xs font-normal text-stone-500">điểm</span>
                    </div>
                    <div className="text-[11px] text-[#B45309]">
                      {user.badgeCount} huy hiệu
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: MINI COMMUNITY FEED (CHIA SẺ KHOẢNH KHẮC)
         ========================================================================= */}
      {leaderboardTab === 'feed' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Post prompt CTA banner */}
          <div className="p-6 bg-[#FAF7F0] rounded-3xl border-2 border-[#D97706]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base text-stone-900 font-heading">
                Bạn vừa tham dự lễ hội Vũng Tàu?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Chia sẻ cảm xúc, gắn hashtag lễ hội để lan tỏa vẻ đẹp di sản tới du khách muôn phương!
              </p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-xs"
            >
              <PlusCircle size={16} />
              <span>Đăng trải nghiệm ngay</span>
            </button>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"
              >
                {/* Post Author Bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <h5 className="font-bold text-sm text-stone-900">{post.author}</h5>
                      <span className="text-[11px] text-stone-500">{post.timeAgo}</span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#B91C1C]">
                    {post.festivalTag}
                  </span>
                </div>

                {/* Post Content */}
                <div className="px-4 sm:px-5 pb-3 text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {post.content}
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="h-64 sm:h-80 w-full overflow-hidden bg-stone-100">
                    <img
                      src={post.image}
                      alt="Festival moment"
                      className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Post Footer Actions */}
                <div className="p-4 sm:px-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      post.isLiked
                        ? 'text-red-600 font-bold bg-red-50'
                        : 'text-stone-600 hover:text-red-600'
                    }`}
                  >
                    <Heart size={16} className={post.isLiked ? 'fill-current' : ''} />
                    <span>{post.likes} Yêu thích</span>
                  </button>

                  <span className="text-stone-400 text-[11px]">
                    Di sản Vũng Tàu kết nối
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: TẠO BÀI ĐĂNG CHIA SẺ TRẢI NGHIỆM
         ========================================================================= */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h4 className="font-bold text-base font-heading text-stone-900">
                Chia Sẻ Khoảnh Khắc Lễ Hội
              </h4>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Tên hoặc biệt danh của bạn:
                </label>
                <input
                  type="text"
                  value={newPostAuthor}
                  onChange={e => setNewPostAuthor(e.target.value)}
                  placeholder="Ví dụ: Minh Châu (TP.HCM)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Chọn lễ hội liên quan:
                </label>
                <select
                  value={newPostTag}
                  onChange={e => setNewPostTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#B91C1C] bg-white"
                >
                  <option value="#NghinhOngVungTau">#NghinhOngVungTau (Đình Thắng Tam)</option>
                  <option value="#DinhCoLongHai">#DinhCoLongHai (Bờ biển Long Hải)</option>
                  <option value="#MieuBaNguHanh">#MieuBaNguHanh (Hòn Bà - Phường 2)</option>
                  <option value="#KyYenThangTam">#KyYenThangTam (Cầu an Thành Hoàng)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  Cảm xúc & trải nghiệm của bạn:
                </label>
                <textarea
                  rows={4}
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  placeholder="Kể lại khoảnh khắc đáng nhớ, món ăn bạn đã thử hoặc nghi lễ bạn xúc động nhất..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#B91C1C]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold cursor-pointer"
                >
                  Đăng bài
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
