/**
 * Dữ liệu chuẩn về các Lễ hội truyền thống tại Vũng Tàu
 * Phục vụ Cổng thông tin Lễ hội Vũng Tàu
 */

import nghinhOngImg from '../assets/images/vungtau_nghinh_ong_hero_1790277496085.jpg';
import dinhCoImg from '../assets/images/vungtau_dinh_co_1790277512313.jpg';
import mieuBaImg from '../assets/images/vungtau_mieu_ba_1790277525841.jpg';
import kyYenImg from '../assets/images/vungtau_ky_yen_1790277537682.jpg';

export interface FestivalItem {
  id: string;
  title: string;
  shortTitle: string;
  badgeTitle: string;
  lunarDate: string;
  solarEstimatedDate: string;
  location: string;
  district: string;
  coordinates: { x: number; y: number; lat: number; lng: number }; // x,y for custom interactive SVG map
  tagline: string;
  coverImage: string;
  bannerImage: string;
  colorScheme: {
    primary: string;
    secondary: string;
    border: string;
    accent: string;
  };
  overview: string;
  originAndBelief: string;
  ceremonyPart: {
    title: string;
    summary: string;
    rituals: Array<{ time: string; name: string; description: string }>;
  };
  festivityPart: {
    title: string;
    summary: string;
    activities: Array<{ name: string; description: string; icon: string }>;
  };
  culturalSignificance: string;
  visitorTips: string[];
  socialLinks: {
    facebook: string;
    tiktok: string;
    youtube?: string;
  };
  panorama360Url?: string;
  audioVoiceText: string;
  stampIcon: string;
  secretCheckinCode: string;
}

export const FESTIVALS: FestivalItem[] = [
  {
    id: 'nghinh-ong-thang-tam',
    title: 'Lễ hội Nghinh Ông Thắng Tam',
    shortTitle: 'Nghinh Ông Thắng Tam',
    badgeTitle: 'Hộ Thần Biển Cả',
    lunarDate: '15 - 18 tháng 8 Âm lịch hằng năm',
    solarEstimatedDate: 'Khoảng tháng 9 - 10 Dương lịch',
    location: 'Đình thần Thắng Tam, 77 Hoàng Hoa Thám, P. Thắng Tam, TP. Vũng Tàu',
    district: 'Phường Thắng Tam, TP. Vũng Tàu',
    coordinates: { x: 38, y: 62, lat: 10.3421, lng: 107.0853 },
    tagline: 'Lễ hội Di sản Văn hóa Phi vật thể Quốc gia tôn vinh ơn đức Thần Cá Ông bảo trợ ngư dân biển bạc',
    coverImage: nghinhOngImg,
    bannerImage: nghinhOngImg,
    colorScheme: {
      primary: '#B91C1C', // Đỏ son
      secondary: '#D97706', // Vàng đồng
      border: '#F59E0B',
      accent: '#0284C7', // Xanh biển Vũng Tàu
    },
    overview: 'Lễ hội Nghinh Ông Thắng Tam là lễ hội lớn nhất, thiêng liêng nhất của cộng đồng cư dân vùng biển Vũng Tàu. Đây không chỉ là nét sinh hoạt tín ngưỡng dân gian mà còn là ngày hội biểu dương lòng tri ân sâu sắc của ngư dân đối với Cá Ông (cá voi) - vị phúc thần luôn che chở, cứu giúp ngư dân vượt qua phong ba bão táp trên biển khơi.',
    originAndBelief: 'Tín ngưỡng thờ Cá Ông bắt nguồn từ văn hóa Chăm-pa cổ xưa, sau đó được người Việt tiếp thu, dung hợp và phát triển đậm đà bản sắc phương Nam. Ngư dân tin rằng cá voi là hóa thân của Bồ Tát Quán Thế Âm hóa giải giông bão cứu người. Triều đình nhà Nguyễn đã nhiều lần ban sắc phong cho Cá Ông tước hiệu "Đại Càn Quốc Gia Nam Hải Ngọc Lân Tôn Thần". Tại Đình thần Thắng Tam hiện còn lưu giữ một trong những bộ ngọc cốt (xương cá voi) khổng lồ và linh thiêng bậc nhất Việt Nam.',
    ceremonyPart: {
      title: 'Phần Lễ: Trang nghiêm, thành kính rước Thần trên biển',
      summary: 'Các nghi thức cổ truyền được thực hiện chuẩn mực theo nghi lễ tế thần cung đình triều Nguyễn kết hợp phong tục cổ truyền miền biển.',
      rituals: [
        {
          time: 'Sáng ngày 15/8 Âm lịch (05:30 - 08:30)',
          name: 'Lễ Rước Nghinh Ông trên biển',
          description: 'Đoàn tàu hoa rực rỡ cờ lọng gồm hàng chục tàu thuyền đánh cá trang hoàng lộng lẫy cùng hướng ra biển Bãi Trước làm lễ dâng hương, rước long vị Thần Cá Ông về đất liền trong tiếng trống hội vang trời.',
        },
        {
          time: 'Sáng ngày 15/8 Âm lịch (09:00 - 11:00)',
          name: 'Lễ rước sắc phong & Lễ tế Tiền hiền, Hậu hiền',
          description: 'Đoàn kiệu rước sắc phong và long vị từ bờ biển về Đình thần Thắng Tam. Các bô lão trong trang phục áo the khăn xếp hành lễ dâng trà, dâng rượu, đọc văn tế tạ ơn thần linh che chở cho làng.',
        },
        {
          time: 'Ngày 16 - 17/8 Âm lịch',
          name: 'Lễ cúng Tiền vãng & Lễ tạ thần',
          description: 'Cúng tế tri ân những người có công khai khẩn vùng đất Thắng Tam và các bậc tiền nhân tử nạn vì biển cả. Tạ ơn trời đất phù hộ sóng yên biển lặng, tôm cá đầy khoang.',
        },
      ],
    },
    festivityPart: {
      title: 'Phần Hội: Tưng bừng náo nức với sắc màu văn hóa dân gian',
      summary: 'Không gian mở đón hàng vạn du khách và người dân địa phương tham gia các trò chơi và hoạt động nghệ thuật sống động.',
      activities: [
        {
          name: 'Múa Lân - Sư - Rồng truyền thống',
          description: 'Các đoàn lân danh tiếng biểu diễn kỹ thuật leo cột, nhảy mai hoa thung rộn rã trên quảng trường trước Đình thần Thắng Tam.',
          icon: 'Sparkles',
        },
        {
          name: 'Hát Bội (Tuồng cổ Nam Bộ)',
          description: 'Biểu diễn các vở tuồng lịch sử, ca ngợi lòng trung hiếu tiết nghĩa, phục vụ nhân dân và chư thần liên tục suốt các đêm lễ hội.',
          icon: 'Music',
        },
        {
          name: 'Hội thi thể thao & Trò chơi dân gian miền biển',
          description: 'Thi đan lưới nhanh, đua thuyền rồng trên biển, kéo co tập thể, thi gánh cá vượt chướng ngại vật tại bờ cát Bãi Sau.',
          icon: 'Trophy',
        },
        {
          name: 'Giao lưu ẩm thực biển Vũng Tàu',
          description: 'Thưởng thức bánh khọt, gỏi cá mai, chả cá thu, hải sản tươi sống do chính các gia đình ngư dân chế biến thết đãi khách thập phương.',
          icon: 'Utensils',
        },
      ],
    },
    culturalSignificance: 'Năm 2023, Lễ hội Nghinh Ông Thắng Tam đã được Bộ Văn hóa, Thể thao và Du lịch ghi danh là Di sản Văn hóa Phi vật thể Quốc gia. Lễ hội là bảo tàng sống về đời sống tinh thần, sự gắn kết cộng đồng làng chài và khát vọng chinh phục đại dương bền bỉ của người dân Vũng Tàu.',
    visitorTips: [
      'Nên có mặt tại Bãi Trước từ 5h sáng ngày 15/8 Âm lịch để chiêm ngưỡng đoàn thuyền rước lộng lẫy nhất.',
      'Trang phục lịch sự, kín đáo khi bước vào chánh điện và nhà trưng bày xương Cá Ông tại Đình thần Thắng Tam.',
      'Giữ gìn vệ sinh môi trường bãi biển, không xả rác khi tham gia lễ hội.',
      'Chuẩn bị nón, kem chống nắng và nước uống vì các hoạt động ngoài trời diễn ra khá sôi nổi.',
    ],
    socialLinks: {
      facebook: 'https://facebook.com/lehoinghinhongvungtau',
      tiktok: 'https://tiktok.com/@lehoivungtau.official',
      youtube: 'https://youtube.com',
    },
    audioVoiceText: 'Chào mừng quý khách đến với Lễ hội Nghinh Ông Thắng Tam Vũng Tàu. Diễn ra từ ngày 15 đến 18 tháng 8 Âm lịch hằng năm tại Đình thần Thắng Tam, đây là lễ hội truyền thống quy mô nhất của ngư dân miền biển nhằm bày tỏ lòng tôn kính với Cá Ông, vị thần bảo hộ giữa ngàn khơi. Lễ hội gồm phần lễ trang nghiêm rước sắc trên biển và phần hội tưng bừng với múa lân, hát bội và các trò chơi dân gian rực rỡ sắc màu.',
    stampIcon: 'Fish',
    secretCheckinCode: 'NGHINHONG2026',
  },
  {
    id: 'dinh-co-long-hai',
    title: 'Lễ hội Dinh Cô Long Hải',
    shortTitle: 'Dinh Cô Long Hải',
    badgeTitle: 'Bảo Trợ Long Hải',
    lunarDate: '10 - 12 tháng 2 Âm lịch',
    solarEstimatedDate: 'Khoảng tháng 3 Dương lịch',
    location: 'Dinh Cô, thị trấn Long Hải, huyện Long Điền (sát cạnh TP. Vũng Tàu)',
    district: 'Bờ biển Long Hải',
    coordinates: { x: 78, y: 35, lat: 10.3756, lng: 107.2412 },
    tagline: 'Lễ hội lớn bên thềm sóng biếc tưởng nhớ Bà Cô linh thiêng giàu lòng trắc ẩn',
    coverImage: dinhCoImg,
    bannerImage: dinhCoImg,
    colorScheme: {
      primary: '#D97706', // Vàng cam ấm
      secondary: '#0284C7', // Xanh biển
      border: '#FBBF24',
      accent: '#EA580C',
    },
    overview: 'Lễ hội Dinh Cô Long Hải là một trong những lễ hội nước lớn nhất vùng Đông Nam Bộ, thu hút hàng chục vạn lượt khách hành hương mỗi năm. Ngôi đền Dinh Cô tọa lạc uy nghiêm bên đồi cát hướng thẳng ra biển lộng gió, thờ Nữ thần Lê Thị Hồng (Bà Cô) trinh liệt phù hộ bá tánh an lành.',
    originAndBelief: 'Truyền thuyết kể rằng cách đây hơn 200 năm, cô gái trẻ Lê Thị Hồng quê ở Bình Định trôi dạt vào bờ biển Long Hải sau một cơn giông tố. Ngư dân địa phương đã chôn cất và lập miếu thờ. Sau đó, Bà Cô nhiều lần hiển linh báo trước bão tố, cứu độ ngư dân vượt nạn và mang lại mùa cá đầy thuyền. Năm 1930, miếu được xây dựng lại khang trang và sắc phong thờ phụng trang trọng.',
    ceremonyPart: {
      title: 'Phần Lễ: Nghi thức nghinh Cô bãi biển linh thiêng',
      summary: 'Lễ rước diễn ra lúc bình minh trên bãi biển Long Hải với hàng trăm ghe thuyền kết hoa đăng rực rỡ.',
      rituals: [
        {
          time: 'Rạng sáng ngày 11/2 Âm lịch',
          name: 'Lễ Nghinh Cô trên biển',
          description: 'Hàng chục ghe thuyền kết cờ hoa trang trọng ra biển làm lễ rước bài vị Cô. Khi đoàn tàu quay về, hàng vạn người dân đứng đón rước linh vị Cô lên kiệu hoa tiến về chánh điện.',
        },
        {
          time: 'Đêm 11 rạng 12/2 Âm lịch',
          name: 'Đêm lễ cúng Thỉnh Thần & Hội hoa đăng',
          description: 'Người dân và du khách thả đèn hoa đăng lung linh cầu chúc bình an khắp mặt biển Long Hải, khói trầm nghi ngút thâu đêm suốt sáng.',
        },
      ],
    },
    festivityPart: {
      title: 'Phần Hội: Ngày hội bên bờ sóng',
      summary: 'Không khí lễ hội náo nhiệt lan tỏa dọc chiều dài bãi biển Long Hải xinh đẹp.',
      activities: [
        {
          name: 'Đua thuyền rồng biển Long Hải',
          description: 'Các đội thuyền đánh cá so tài ngoạn mục trên sóng nước với tiếng hò reo cổ vũ cuồng nhiệt.',
          icon: 'Ship',
        },
        {
          name: 'Hát Bả Trạo & Hát Bội cung đình',
          description: 'Lời ca nhịp nhàng mô phỏng động tác chèo thuyền qua sóng cả, vừa diễn xướng vừa dâng lễ vật tạ ơn Cô.',
          icon: 'Music',
        },
        {
          name: 'Thả diều nghệ thuật bờ biển',
          description: 'Hàng trăm cánh diều khổng lồ hình rồng phượng, sinh vật biển bay lượn rực rỡ trên bầu trời Long Hải.',
          icon: 'Sun',
        },
      ],
    },
    culturalSignificance: 'Lễ hội Dinh Cô được công nhận là Di sản Văn hóa Phi vật thể Quốc gia đầu năm 2023, mang nét đẹp văn hóa tâm linh kết hợp du lịch sinh thái biển đặc trưng của vùng đất Bà Rịa - Vũng Tàu.',
    visitorTips: [
      'Mang giày dép dễ đi lại vì khuôn viên Dinh Cô có nhiều bậc thang dốc thoai thoải.',
      'Nếu muốn tham gia lễ nghinh Cô bãi biển, hãy chuẩn bị dậy sớm từ 4h30 sáng.',
      'Thưởng thức các đặc sản bánh hỏi An Nhứt, mực một nắng nướng ngay tại chợ đêm Long Hải.',
    ],
    socialLinks: {
      facebook: 'https://facebook.com/dinhcolonghai',
      tiktok: 'https://tiktok.com/@dinhcovungtau',
    },
    audioVoiceText: 'Lễ hội Dinh Cô Long Hải diễn ra từ mùng 10 đến 12 tháng Hai Âm lịch bên bờ biển Long Hải. Tưởng nhớ Bà Cô linh thiêng, lễ hội hội tụ hàng chục vạn đồng bào dâng hương, rước kiệu hoa rực rỡ từ biển vào đền, kết hợp đêm hội thả hoa đăng lung linh cầu cho quốc thái dân an.',
    stampIcon: 'Anchor',
    secretCheckinCode: 'DINHCO2026',
  },
  {
    id: 'mieu-ba-ngu-hanh',
    title: 'Lễ hội Miếu Bà Ngũ Hành',
    shortTitle: 'Miếu Bà Ngũ Hành',
    badgeTitle: 'Ngũ Hành Nương Nương',
    lunarDate: '16 - 18 tháng 10 Âm lịch',
    solarEstimatedDate: 'Khoảng tháng 11 - 12 Dương lịch',
    location: 'Miếu Bà Ngũ Hành, đường Hoàng Hoa Thám, Phường 2, TP. Vũng Tàu',
    district: 'Phường 2, TP. Vũng Tàu',
    coordinates: { x: 42, y: 76, lat: 10.3345, lng: 107.0812 },
    tagline: 'Tôn vinh ngũ đức càn khôn Kim Mộc Thủy Hỏa Thổ cầu mưa thuận gió hòa',
    coverImage: mieuBaImg,
    bannerImage: mieuBaImg,
    colorScheme: {
      primary: '#C2410C', // Cam đất son
      secondary: '#0E7490', // Xanh lam ngọc
      border: '#FB923C',
      accent: '#059669',
    },
    overview: 'Miếu Bà Ngũ Hành tại Vũng Tàu là di tích lịch sử văn hóa tâm linh lâu đời. Lễ hội suy tôn năm vị thần Nữ bảo trợ năm nguyên tố cấu tạo nên vũ trụ: Kim Đức Thánh Phi, Mộc Đức Thánh Phi, Thủy Đức Thánh Phi, Hỏa Đức Thánh Phi và Thổ Đức Thánh Phi.',
    originAndBelief: 'Tín ngưỡng Ngũ Hành gắn bó mật thiết với cuộc sống của cư dân nông nghiệp và ngư nghiệp phương Nam. Ngũ Hành tương sinh tương khắc bảo hộ đất đai màu mỡ, biển khơi êm dịu. Đặc biệt tại Vũng Tàu, lễ rước độc đáo đi bộ qua con đường đá nổi lên khi thủy triều rút ra Miếu Hòn Bà đã trở thành khoảnh khắc kỳ thú của du khách muôn phương.',
    ceremonyPart: {
      title: 'Phần Lễ: Lễ tế ngũ phương uy nghiêm & rước kiệu',
      summary: 'Trang nghiêm dâng hoa quả, ngũ cốc và các nghi thức tế lễ tạ ơn trời đất hộ trì vạn vật sinh sôi.',
      rituals: [
        {
          time: 'Ngày 16/10 Âm lịch',
          name: 'Lễ Tế Ngũ Phương Thánh Nương',
          description: 'Các bô lão và ban tế tự dâng năm mâm lễ vật ngũ sắc tượng trưng năm phương trời, đọc sớ cầu cho mùa màng bội thu, ngư dân đầy tôm cá.',
        },
        {
          time: 'Ngày 17/10 Âm lịch (Canh theo giờ thủy triều rút)',
          name: 'Nghi thức rước Bà qua lối mòn Hòn Bà',
          description: 'Hàng ngàn người nối đuôi nhau lội qua con đường đá sỏi lộ thiên giữa làn nước biển rút để dâng hương tại Hòn Bà.',
        },
      ],
    },
    festivityPart: {
      title: 'Phần Hội: Múa Bóng Rỗi & Hát Tuồng Cổ',
      summary: 'Nét diễn xướng dân gian độc nhất vô nhị của văn hóa dân gian Nam Bộ.',
      activities: [
        {
          name: 'Nghệ thuật Múa Bóng Rỗi',
          description: 'Các nghệ nhân khéo léo đội mâm vàng, bình hoa, múa dao thăng bằng trên trán và môi trong tiếng đờn ca rộn rã tôn vinh Mẫu.',
          icon: 'Sparkles',
        },
        {
          name: 'Hát Bội dâng Bà',
          description: 'Biểu diễn phục vụ các tích tuồng cổ truyền mang đậm ý nghĩa răn dạy đạo hiếu và bảo vệ giang sơn xã tắc.',
          icon: 'Music',
        },
      ],
    },
    culturalSignificance: 'Miếu Bà Ngũ Hành minh chứng cho sự bao dung văn hóa, bảo lưu nét đẹp diễn xướng dân gian truyền thống múa bóng rỗi - di sản quý báu của cư dân phương Nam.',
    visitorTips: [
      'Nên theo dõi bảng lịch thủy triều tại Vũng Tàu để biết chính xác khung giờ nước rút nếu muốn trải nghiệm đi bộ ra Hòn Bà.',
      'Cẩn thận trơn trượt trên các mỏm đá có hàu bám khi di chuyển.',
    ],
    socialLinks: {
      facebook: 'https://facebook.com/mieubanguhanhvungtau',
      tiktok: 'https://tiktok.com/@mieubavungtau',
    },
    audioVoiceText: 'Lễ hội Miếu Bà Ngũ Hành diễn ra từ ngày 16 đến 18 tháng 10 Âm lịch tại Phường 2, Vũng Tàu. Đây là lễ hội tôn vinh năm vị thần bảo hộ ngũ hành Kim Mộc Thủy Hỏa Thổ, nổi tiếng với nghi thức rước độc đáo khi thủy triều rút trên biển và nghệ thuật múa bóng rỗi đặc sắc của đất phương Nam.',
    stampIcon: 'Compass',
    secretCheckinCode: 'MIEUBA2026',
  },
  {
    id: 'ky-yen-thang-tam',
    title: 'Lễ hội Kỳ Yên Đình thần Thắng Tam',
    shortTitle: 'Kỳ Yên Đình Thắng Tam',
    badgeTitle: 'Thành Hoàng Cầu An',
    lunarDate: '17 - 20 tháng 2 Âm lịch',
    solarEstimatedDate: 'Khoảng tháng 3 Dương lịch',
    location: 'Đình thần Thắng Tam, Phường Thắng Tam, TP. Vũng Tàu',
    district: 'Phường Thắng Tam, TP. Vũng Tàu',
    coordinates: { x: 40, y: 64, lat: 10.3418, lng: 107.0858 },
    tagline: 'Lễ hội cầu an thiêng liêng đậm đà hồn cốt làng xã Nam Bộ giữa lòng phố biển',
    coverImage: kyYenImg,
    bannerImage: kyYenImg,
    colorScheme: {
      primary: '#9A3412', // Đỏ nâu đồng
      secondary: '#B45309', // Vàng hoàng gia
      border: '#D97706',
      accent: '#15803D',
    },
    overview: 'Lễ hội Kỳ Yên (Cầu An) là nghi lễ quan trọng nhất trong chu kỳ một năm của ngôi đình làng Nam Bộ. Tại Đình thần Thắng Tam - nơi thờ 3 vị tiền hiền lập nên ba làng Thắng (Thắng Nhất, Thắng Nhì, Thắng Tam), lễ hội là dịp hội tụ con cháu các dòng họ, tri ân tổ tiên và gắn kết tình làng nghĩa xóm.',
    originAndBelief: 'Đầu thế kỷ 19, vua Gia Long cử 3 đội thuyền binh đến trấn giữ cửa biển Vũng Tàu chống cướp biển. Sau khi lập lại bình yên, binh lính được giải ngũ và khai phá lập nên 3 làng Thắng Tam. Ba vị chỉ huy là Phạm Văn Dinh, Lê Văn Lộc và Ngô Văn Huyền được tôn làm Thành Hoàng bảo hộ quê hương.',
    ceremonyPart: {
      title: 'Phần Lễ: Đại lễ cầu an quy củ cổ truyền',
      summary: 'Thực hiện đầy đủ tuần tự các nghi lễ Thành Hoàng theo lễ điển triều Nguyễn.',
      rituals: [
        {
          time: 'Ngày 17/2 Âm lịch',
          name: 'Lễ Thỉnh Sắc & Tế Tiền Hiền',
          description: 'Cung nghinh các đạo sắc phong của vua Minh Mạng, Thiệu Trị, Tự Đức ban tặng ngôi đình ra chánh điện để phụng tế.',
        },
        {
          time: 'Ngày 18/2 Âm lịch',
          name: 'Đại tế Kỳ Yên & Tống Khách',
          description: 'Nghi thức dâng tam sanh, xướng văn tế cầu phúc bình an, sau đó thả bè thuyền tống khứ mọi điều xui rủi ra biển lớn.',
        },
      ],
    },
    festivityPart: {
      title: 'Phần Hội: Vang vọng tiếng trống hát đình',
      summary: 'Đậm nét không gian hội làng phương Nam xưa.',
      activities: [
        {
          name: 'Hát bội cúng Đình xuyên đêm',
          description: 'Diễn các tích tuồng cổ nổi tiếng San Hậu, Trảm Trịnh Ân để tạ thần và giải trí cho dân làng.',
          icon: 'Music',
        },
        {
          name: 'Bữa cơm sum họp con cháu ba làng Thắng',
          description: 'Các bô lão và gia đình cùng chia lộc đình, ôn lại lịch sử mở cõi oai hùng của cha ông khai phá Vũng Tàu.',
          icon: 'Users',
        },
      ],
    },
    culturalSignificance: 'Lễ hội Kỳ Yên Thắng Tam là gạch nối thiêng liêng giữa quá khứ và hiện tại, giáo dục đạo lý "Uống nước nhớ nguồn" cho thế hệ trẻ Vũng Tàu.',
    visitorTips: [
      'Đình thần Thắng Tam có kiến trúc chạm khắc rồng phượng tinh xảo thời Nguyễn, rất thích hợp cho những ai đam mê nhiếp ảnh di sản.',
      'Nên xin lộc bùa cầu an đầu năm tại gian tả hữu của đình.',
    ],
    socialLinks: {
      facebook: 'https://facebook.com/dinhthanthangtam',
      tiktok: 'https://tiktok.com/@thangtamheritage',
    },
    audioVoiceText: 'Lễ hội Kỳ Yên Đình thần Thắng Tam diễn ra từ ngày 17 đến 20 tháng 2 Âm lịch. Đây là đại lễ cầu an lớn nhất trong năm để tưởng nhớ công đức ba vị tiền hiền khai phá nên ba làng Thắng Tam thuở đầu triều Nguyễn, cầu cho phong điều vũ thuận, gia đạo bình an hạnh phúc.',
    stampIcon: 'Award',
    secretCheckinCode: 'KYYEN2026',
  },
];

// Trivia / Lucky wheel questions & facts
export interface WheelSector {
  id: string;
  label: string;
  color: string;
  textColor: string;
  type: 'question' | 'fact' | 'points';
  title: string;
  content: string;
  options?: string[];
  correctAnswer?: number;
  explanation: string;
  points: number;
}

export const LUCKY_WHEEL_SECTORS: WheelSector[] = [
  {
    id: 'w1',
    label: 'Cá Ông Vũng Tàu',
    color: '#B91C1C', // Vermilion
    textColor: '#FFFFFF',
    type: 'question',
    title: 'Tín ngưỡng Nam Hải Ngọc Lân',
    content: 'Tại Đình thần Thắng Tam, ngư dân Vũng Tàu tôn thờ loài sinh vật biển nào như vị thần hộ mệnh?',
    options: ['Cá Heo', 'Cá Voi (Cá Ông)', 'Rùa Biển khổng lồ', 'Cá Mập đầu búa'],
    correctAnswer: 1,
    explanation: 'Chính xác! Ngư dân miền biển tôn kính gọi Cá Voi là Cá Ông (Đại Càn Quốc Gia Nam Hải Ngọc Lân Tôn Thần) vì công ơn cứu vớt người gặp bão.',
    points: 100,
  },
  {
    id: 'w2',
    label: 'Bảo vật Di sản',
    color: '#D97706', // Gold
    textColor: '#FFFFFF',
    type: 'fact',
    title: 'Di sản Văn hóa Quốc gia',
    content: 'Năm 2023, cả hai lễ hội lớn Lễ hội Nghinh Ông Thắng Tam và Lễ hội Dinh Cô Long Hải đều đã được vinh danh là Di sản Văn hóa Phi vật thể Quốc gia!',
    explanation: 'Sự công nhận này khẳng định giá trị lịch sử và sức sống bền bỉ của văn hóa miền biển Bà Rịa - Vũng Tàu.',
    points: 80,
  },
  {
    id: 'w3',
    label: 'Dinh Cô Long Hải',
    color: '#0284C7', // Ocean blue
    textColor: '#FFFFFF',
    type: 'question',
    title: 'Lễ hội Dinh Cô',
    content: 'Lễ hội Dinh Cô Long Hải diễn ra vào thời gian nào trong năm theo Âm lịch?',
    options: ['Mùng 1-3 Tết', '10 - 12 tháng 2 Âm lịch', '15 tháng 8 Âm lịch', 'Rằm tháng 10'],
    correctAnswer: 1,
    explanation: 'Chính xác! Lễ hội Dinh Cô diễn ra vào ngày 10 đến 12 tháng 2 Âm lịch hàng năm bên bờ biển Long Hải.',
    points: 120,
  },
  {
    id: 'w4',
    label: 'Đi bộ ra Hòn Bà',
    color: '#059669', // Emerald
    textColor: '#FFFFFF',
    type: 'fact',
    title: 'Con đường đá kỳ thú giữa biển',
    content: 'Trong Lễ hội Miếu Bà Ngũ Hành, khi thủy triều rút cạn, một con đường đá sỏi độc đáo sẽ lộ ra giữa biển để du khách đi bộ thẳng ra Miếu Hòn Bà!',
    explanation: 'Đây là hiện tượng thiên nhiên kỳ thú kết hợp hài hòa với nét văn hóa hành hương tâm linh Vũng Tàu.',
    points: 80,
  },
  {
    id: 'w5',
    label: 'Diễn xướng dân gian',
    color: '#EA580C', // Sunset orange
    textColor: '#FFFFFF',
    type: 'question',
    title: 'Nghệ thuật trình diễn độc đáo',
    content: 'Nghệ thuật diễn xướng dân gian đặc trưng nào thường được biểu diễn tại Lễ hội Miếu Bà Ngũ Hành?',
    options: ['Hát Ca Trù', 'Múa Xòe Thái', 'Múa Bóng Rỗi', 'Hát Quan Họ'],
    correctAnswer: 2,
    explanation: 'Xuất sắc! Múa Bóng Rỗi là nghệ thuật diễn xướng dân gian Nam Bộ đặc sắc với kỹ thuật giữ thăng bằng bình hoa, mâm vàng dâng Bà.',
    points: 150,
  },
  {
    id: 'w6',
    label: 'Ba làng Thắng Tam',
    color: '#7C3AED', // Purple
    textColor: '#FFFFFF',
    type: 'fact',
    title: 'Nguồn gốc tên gọi Thắng Tam',
    content: 'Địa danh Thắng Tam xuất phát từ việc vua Gia Long phái 3 thuyền binh đến cắm chốt bảo vệ biển, sau đó lập nên 3 làng: Thắng Nhất, Thắng Nhì và Thắng Tam.',
    explanation: 'Ba vị tiền hiền chỉ huy được nhân dân tôn kính thờ tự tại Đình thần Thắng Tam trong Lễ hội Kỳ Yên.',
    points: 80,
  },
  {
    id: 'w7',
    label: 'Thần tài May Mắn',
    color: '#DC2626', // Bright red
    textColor: '#FFFFFF',
    type: 'points',
    title: 'Lộc Biển May Mắn!',
    content: 'Chúc mừng bạn! Bạn nhận được túi tài lộc may mắn từ Lễ hội Nghinh Ông Vũng Tàu!',
    explanation: 'Điểm thưởng này sẽ được cộng trực tiếp vào Hộ chiếu Lễ hội của bạn!',
    points: 200,
  },
  {
    id: 'w8',
    label: 'Ẩm thực Lễ hội',
    color: '#CA8A04', // Amber
    textColor: '#FFFFFF',
    type: 'question',
    title: 'Món ngon phố biển',
    content: 'Món ăn dân dã đặc sản nổi tiếng nào của Vũng Tàu thường được du khách thưởng thức nức lòng khi trẩy hội?',
    options: ['Bún Chả Hà Nội', 'Bánh Khọt Vũng Tàu', 'Bánh Đậu Xanh', 'Cơm Hến'],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Bánh khọt giòn rụm với tôm tươi thơm ngậy, ăn kèm rau rừng và nước mắm chua ngọt là đặc sản trứ danh Vũng Tàu.',
    points: 100,
  },
];

// Quiz Game 1: Đoán lễ hội qua hình ảnh
export interface GuessGameItem {
  id: number;
  clues: string[];
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export const GUESS_GAME_ITEMS: GuessGameItem[] = [
  {
    id: 1,
    clues: [
      'Đoàn thuyền hoa trang hoàng rực rỡ ra khơi từ sáng sớm',
      'Đình thần lưu giữ ngọc cốt xương cá voi linh thiêng',
      'Múa lân sư rồng và hát bội diễn liên tục thâu đêm',
      'Diễn ra vào ngày rằm tháng 8 Âm lịch bên Bãi Trước',
    ],
    options: [
      'Lễ hội Dinh Cô Long Hải',
      'Lễ hội Nghinh Ông Thắng Tam',
      'Lễ hội Miếu Bà Ngũ Hành',
      'Lễ hội Trùng Cửu Nhà Lớn Long Sơn',
    ],
    correctIndex: 1,
    hint: 'Lễ hội lớn nhất của ngư dân Vũng Tàu thờ phụng Nam Hải Ngọc Lân.',
    explanation: 'Chính xác! Đó là Lễ hội Nghinh Ông Thắng Tam - Di sản Văn hóa Phi vật thể Quốc gia tôn vinh ơn đức Cá Ông.',
  },
  {
    id: 2,
    clues: [
      'Ngôi đền uy nghiêm tọa lạc bên đồi cát nhìn thẳng ra biển',
      'Đám rước nghinh kiệu trang trọng bên bờ cát lúc rạng đông',
      'Tưởng nhớ người thiếu nữ linh thiêng giàu lòng trắc ẩn',
      'Diễn ra từ mùng 10 đến 12 tháng 2 Âm lịch tại thị trấn Long Hải',
    ],
    options: [
      'Lễ hội Dinh Cô Long Hải',
      'Lễ hội Kỳ Yên Thắng Tam',
      'Lễ hội Đền Hùng',
      'Lễ hội Nghinh Ông Thắng Tam',
    ],
    correctIndex: 0,
    hint: 'Lễ hội nước khổng lồ thu hút hàng vạn khách hành hương bên bãi biển Long Hải.',
    explanation: 'Chính xác! Đó chính là Lễ hội Dinh Cô Long Hải nổi tiếng khắp vùng Đông Nam Bộ.',
  },
  {
    id: 3,
    clues: [
      'Tôn thờ năm vị thần Nữ tương sinh Kim, Mộc, Thủy, Hỏa, Thổ',
      'Con đường sỏi đá kỳ lạ lộ ra khi thủy triều rút ra đảo',
      'Nghệ thuật diễn xướng Múa Bóng Rỗi giữ thăng bằng mâm vàng',
      'Diễn ra vào giữa tháng 10 Âm lịch tại Phường 2, TP. Vũng Tàu',
    ],
    options: [
      'Lễ hội Kỳ Yên Đình Thắng Tam',
      'Lễ hội Nghinh Ông',
      'Lễ hội Miếu Bà Ngũ Hành',
      'Lễ hội Chùa Bà Thiên Hậu',
    ],
    correctIndex: 2,
    hint: 'Lễ hội suy tôn 5 nguyên tố vũ trụ và có tục đi bộ qua đảo Hòn Bà.',
    explanation: 'Chính xác! Đó là Lễ hội Miếu Bà Ngũ Hành, nơi gìn giữ nghệ thuật múa bóng rỗi tuyệt đỉnh.',
  },
  {
    id: 4,
    clues: [
      'Tế thần Thành Hoàng và ba vị tiền hiền khai lập làng',
      'Nghi thức Tống Khách thả bè thuyền tống khứ xui rủi',
      'Lễ cầu an quy mô lớn nhất đầu năm của cư dân ba làng Thắng',
      'Diễn ra khoảng tháng 2 Âm lịch tại di tích lịch sử Đình Thắng Tam',
    ],
    options: [
      'Lễ hội Dinh Cô',
      'Lễ hội Kỳ Yên Đình thần Thắng Tam',
      'Lễ hội Bánh Khọt Vũng Tàu',
      'Lễ hội Miếu Bà Ngũ Hành',
    ],
    correctIndex: 1,
    hint: 'Đại lễ cầu an mang đậm bản sắc văn hóa làng xã Nam Bộ.',
    explanation: 'Chính xác! Đó là Lễ hội Kỳ Yên Đình thần Thắng Tam, gạch nối tình làng nghĩa xóm thiêng liêng.',
  },
];

// Game 2: Đúng hay Sai (True/False)
export interface TrueFalseQuestion {
  id: number;
  question: string;
  isTrue: boolean;
  explanation: string;
  funFact: string;
}

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 1,
    question: 'Tại Đình thần Thắng Tam, người ta bảo quản một bộ xương cá voi (Cá Ông) thật có niên đại hàng trăm năm.',
    isTrue: true,
    explanation: 'Đúng! Đình thần Thắng Tam hiện đang lưu giữ bộ xương cá voi dài hàng chục mét được táng trọng thể hơn 100 năm trước.',
    funFact: 'Khi Cá Ông lụy (dạt vào bờ), người đầu tiên nhìn thấy sẽ được vinh dự làm "trưởng nam" để thọ tang và làm đám tang cho Thần.',
  },
  {
    id: 2,
    question: 'Lễ hội Nghinh Ông Vũng Tàu chỉ có phần nghi lễ cúng tế, hoàn toàn không có các hoạt động vui chơi giải trí.',
    isTrue: false,
    explanation: 'Sai! Lễ hội Nghinh Ông có Phần Hội vô cùng sôi nổi với múa lân sư rồng, hát bội, đua thuyền, kéo co và hội ẩm thực dân gian.',
    funFact: 'Phần hội Nghinh Ông thu hút thanh niên và giới trẻ hào hứng tham gia các môn thể thao dân gian bờ biển.',
  },
  {
    id: 3,
    question: 'Miếu Hòn Bà nằm giữa biển có thể đi bộ ra được vào thời điểm thủy triều rút sâu nhất trong tháng.',
    isTrue: true,
    explanation: 'Đúng! Khi nước ròng (thủy triều rút), một con đường đá tự nhiên sẽ nối liền bờ cát Bãi Sau với đảo Hòn Bà.',
    funFact: 'Hàng ngàn du khách thích thú canh lịch nước rút để trải nghiệm cảm giác đi bộ kỳ thú giữa biển.',
  },
  {
    id: 4,
    question: 'Lễ hội Dinh Cô Long Hải diễn ra vào tháng 8 Âm lịch trùng với Tết Trung Thu.',
    isTrue: false,
    explanation: 'Sai! Lễ hội Dinh Cô Long Hải diễn ra vào ngày 10 đến 12 tháng 2 Âm lịch, còn tháng 8 Âm lịch là thời điểm tổ chức Lễ hội Nghinh Ông Thắng Tam.',
    funFact: 'Tháng 2 Âm lịch là dịp tiết trời mùa xuân Long Hải êm đềm, biển trong xanh và mát lành nhất.',
  },
  {
    id: 5,
    question: 'Cả Lễ hội Nghinh Ông Thắng Tam và Lễ hội Dinh Cô đều đã được ghi danh là Di sản Văn hóa Phi vật thể Quốc gia.',
    isTrue: true,
    explanation: 'Đúng! Cả hai lễ hội đều vinh dự được Bộ Văn hóa, Thể thao và Du lịch công nhận là Di sản Văn hóa Phi vật thể Quốc gia vào năm 2023.',
    funFact: 'Đây là niềm tự hào lớn của ngành văn hóa du lịch tỉnh Bà Rịa - Vũng Tàu.',
  },
];

// Game 3: Matching Pairs (Ghép đúng cặp)
export interface MatchCard {
  id: string;
  pairId: number;
  content: string;
  type: 'festival' | 'symbol';
  icon: string;
  description: string;
}

export const MATCHING_CARDS_DATA: MatchCard[] = [
  { id: 'm1', pairId: 1, content: 'Lễ hội Nghinh Ông', type: 'festival', icon: 'Fish', description: 'Lễ hội ngư dân lớn nhất Vũng Tàu' },
  { id: 'm2', pairId: 1, content: 'Thần Nam Hải & Ngọc Cốt Cá Voi', type: 'symbol', icon: 'Ship', description: 'Vị thần cứu trợ ngư dân vượt bão gió' },
  { id: 'm3', pairId: 2, content: 'Lễ hội Dinh Cô', type: 'festival', icon: 'Anchor', description: 'Lễ hội bờ biển Long Hải tháng 2 Âm lịch' },
  { id: 'm4', pairId: 2, content: 'Kiệu Rước Biển & Hoa Đăng', type: 'symbol', icon: 'Sun', description: 'Nghi thức dâng hoa đèn trên sóng biển' },
  { id: 'm5', pairId: 3, content: 'Miếu Bà Ngũ Hành', type: 'festival', icon: 'Compass', description: 'Thờ 5 vị Nữ thần bảo trợ càn khôn' },
  { id: 'm6', pairId: 3, content: 'Múa Bóng Rỗi & Đảo Hòn Bà', type: 'symbol', icon: 'Sparkles', description: 'Lối mòn đi bộ khi thủy triều rút' },
  { id: 'm7', pairId: 4, content: 'Kỳ Yên Thắng Tam', type: 'festival', icon: 'Award', description: 'Lễ cầu an ba làng Thắng thuở khai hoang' },
  { id: 'm8', pairId: 4, content: 'Tế Thành Hoàng & Hát Bội Đình', type: 'symbol', icon: 'Music', description: 'Gìn giữ hồn cốt làng xã Nam Bộ' },
];

// Game 5: Timeline Sorting (Sắp xếp theo thứ tự Âm lịch trong năm)
export interface TimelineItem {
  id: string;
  title: string;
  lunarMonthOrder: number; // 1 to 12
  lunarDateText: string;
  description: string;
  location: string;
}

export const TIMELINE_FESTIVALS: TimelineItem[] = [
  {
    id: 'dinh-co',
    title: 'Lễ hội Dinh Cô Long Hải',
    lunarMonthOrder: 2.1,
    lunarDateText: '10 - 12 tháng 2 Âm lịch',
    description: 'Mở màn mùa xuân hội hè bên bờ biển lộng gió, nghinh kiệu rực rỡ và thả hoa đăng.',
    location: 'Dinh Cô, Long Hải',
  },
  {
    id: 'ky-yen',
    title: 'Lễ hội Kỳ Yên Đình Thắng Tam',
    lunarMonthOrder: 2.2,
    lunarDateText: '17 - 20 tháng 2 Âm lịch',
    description: 'Đại tế cầu an Thành Hoàng, con cháu ba làng Thắng sum vầy cúng bái và xem hát bội.',
    location: 'Đình thần Thắng Tam',
  },
  {
    id: 'nghinh-ong',
    title: 'Lễ hội Nghinh Ông Thắng Tam',
    lunarMonthOrder: 8.0,
    lunarDateText: '15 - 18 tháng 8 Âm lịch',
    description: 'Đại lễ rước Thần Cá Ông trên biển quy mô nhất trong năm của ngư dân miền biển Vũng Tàu.',
    location: 'Đình thần Thắng Tam & Bãi Trước',
  },
  {
    id: 'mieu-ba',
    title: 'Lễ hội Miếu Bà Ngũ Hành',
    lunarMonthOrder: 10.0,
    lunarDateText: '16 - 18 tháng 10 Âm lịch',
    description: 'Lễ tạ ơn ngũ phương ngũ hành Kim Mộc Thủy Hỏa Thổ, múa bóng rỗi và vượt biển ra Hòn Bà.',
    location: 'Phường 2, TP. Vũng Tàu',
  },
];

// Mock Leaderboard users
export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  points: number;
  checkins: number;
  badgeCount: number;
  level: string;
  quote: string;
}

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'u1',
    name: 'Nguyễn Hải Đăng',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rank: 1,
    points: 1250,
    checkins: 4,
    badgeCount: 4,
    level: 'Đại sứ văn hóa Vũng Tàu',
    quote: 'Yêu từng góc đình Thắng Tam và tiếng hò kéo lưới Nghinh Ông!',
  },
  {
    id: 'u2',
    name: 'Trần Minh Thư',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rank: 2,
    points: 980,
    checkins: 4,
    badgeCount: 4,
    level: 'Đại sứ văn hóa Vũng Tàu',
    quote: 'Múa bóng rỗi ở Miếu Bà thật sự là đỉnh cao nghệ thuật dân gian.',
  },
  {
    id: 'u3',
    name: 'Lê Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    rank: 3,
    points: 750,
    checkins: 3,
    badgeCount: 3,
    level: 'Tín đồ lễ hội',
    quote: 'Long Hải mùa Dinh Cô đẹp nao lòng, đồ ăn ngon rẻ!',
  },
  {
    id: 'u4',
    name: 'Phạm Quỳnh Anh',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    rank: 4,
    points: 520,
    checkins: 3,
    badgeCount: 3,
    level: 'Tín đồ lễ hội',
    quote: 'Check-in đủ 4 lễ hội để rinh trọn bộ tem số!',
  },
  {
    id: 'u5',
    name: 'Vũ Đức Trọng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rank: 5,
    points: 420,
    checkins: 2,
    badgeCount: 2,
    level: 'Tín đồ lễ hội',
    quote: 'Lần đầu đi bộ ra Hòn Bà đúng dịp nước rút, kỳ thú vô cùng.',
  },
  {
    id: 'u6',
    name: 'Đỗ Thảo Vy',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rank: 6,
    points: 310,
    checkins: 2,
    badgeCount: 2,
    level: 'Tín đồ lễ hội',
    quote: 'Bánh khọt Vũng Tàu mùa lễ hội ngon xuất sắc!',
  },
];

// Community Social Feed
export interface FeedPost {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  festivalTag: string;
  content: string;
  image: string;
  likes: number;
  isLiked?: boolean;
}

export const INITIAL_COMMUNITY_POSTS: FeedPost[] = [
  {
    id: 'p1',
    author: 'Khánh An (Gen Z Vũng Tàu)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    timeAgo: '2 giờ trước',
    festivalTag: '#NghinhOngVungTau #ThangTamHeritage',
    content: 'Được hòa mình vào đoàn rước Nghinh Ông lúc 6 giờ sáng trên biển Bãi Trước thật sự quá tự hào và choáng ngợp! Tiếng trống hội dồn dập, thuyền bè kết cờ hoa rợp trời biển bạc.',
    image: nghinhOngImg,
    likes: 142,
    isLiked: false,
  },
  {
    id: 'p2',
    author: 'Minh Tuấn (Travel Blogger)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    timeAgo: '5 giờ trước',
    festivalTag: '#DinhCoLongHai #BaoTroLongHai',
    content: 'Long Hải mùa Dinh Cô không khí linh thiêng và ấm áp lạ kỳ. Đêm hoa đăng trên bãi biển lung linh huyền ảo như một bức tranh nghệ thuật!',
    image: dinhCoImg,
    likes: 98,
    isLiked: false,
  },
  {
    id: 'p3',
    author: 'Hương Giang (Nghiên cứu Văn hóa)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    timeAgo: '1 ngày trước',
    festivalTag: '#MieuBaNguHanh #MuaBongRoi',
    content: 'Nghệ thuật múa bóng rỗi tại Miếu Bà Ngũ Hành quả là bảo tàng sống về diễn xướng dân gian Nam Bộ. Các cô chú nghệ nhân thăng bằng mâm vàng điêu luyện vô cùng.',
    image: mieuBaImg,
    likes: 76,
    isLiked: false,
  },
];
