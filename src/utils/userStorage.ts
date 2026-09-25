/**
 * Quản lý trạng thái người dùng, điểm thưởng và hộ chiếu trong LocalStorage
 */

export interface UserPassportData {
  points: number;
  visitedFestivals: string[]; // festival IDs
  badges: Array<{
    id: string;
    festivalId: string;
    title: string;
    unlockedAt: string;
    icon: string;
  }>;
  level: 'Người mới' | 'Tín đồ lễ hội' | 'Đại sứ văn hóa Vũng Tàu';
  luckySpinsToday: number;
  completedGames: {
    guess: number;
    trueFalse: number;
    matching: number;
    timeline: boolean;
  };
}

const STORAGE_KEY = 'vungtau_festival_passport_v1';

const DEFAULT_PASSPORT: UserPassportData = {
  points: 120, // Điểm khởi đầu tặng tân thủ
  visitedFestivals: [],
  badges: [],
  level: 'Người mới',
  luckySpinsToday: 0,
  completedGames: {
    guess: 0,
    trueFalse: 0,
    matching: 0,
    timeline: false,
  },
};

export function calculateLevel(points: number): 'Người mới' | 'Tín đồ lễ hội' | 'Đại sứ văn hóa Vũng Tàu' {
  if (points >= 500) return 'Đại sứ văn hóa Vũng Tàu';
  if (points >= 200) return 'Tín đồ lễ hội';
  return 'Người mới';
}

export function getStoredPassport(): UserPassportData {
  if (typeof window === 'undefined') return DEFAULT_PASSPORT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PASSPORT;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PASSPORT,
      ...parsed,
      level: calculateLevel(parsed.points || DEFAULT_PASSPORT.points),
    };
  } catch {
    return DEFAULT_PASSPORT;
  }
}

export function saveStoredPassport(data: UserPassportData) {
  if (typeof window === 'undefined') return;
  try {
    data.level = calculateLevel(data.points);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota error
  }
}

export function addPoints(amount: number): UserPassportData {
  const current = getStoredPassport();
  current.points += amount;
  current.level = calculateLevel(current.points);
  saveStoredPassport(current);
  return current;
}

export function checkinFestival(festivalId: string, badgeTitle: string, icon: string): {
  success: boolean;
  alreadyCheckedIn: boolean;
  pointsAdded: number;
  passport: UserPassportData;
} {
  const current = getStoredPassport();
  if (current.visitedFestivals.includes(festivalId)) {
    return {
      success: false,
      alreadyCheckedIn: true,
      pointsAdded: 0,
      passport: current,
    };
  }

  const pointsAdded = 150;
  current.points += pointsAdded;
  current.visitedFestivals.push(festivalId);
  current.badges.push({
    id: `badge-${festivalId}`,
    festivalId,
    title: badgeTitle,
    unlockedAt: new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    icon,
  });
  current.level = calculateLevel(current.points);
  saveStoredPassport(current);

  return {
    success: true,
    alreadyCheckedIn: false,
    pointsAdded,
    passport: current,
  };
}
