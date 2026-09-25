import React, { useState } from 'react';
import {
  Users,
  Target,
  BookOpen,
  Award,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Edit3,
  Check,
  Share2
} from 'lucide-react';
import { DongSonSunburst, CulturalDivider } from './DongSonPattern';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  taskDescription: string;
}

export const AboutUs: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 'm1',
      name: 'Nguyễn Văn A (Chủ nhiệm đề tài)',
      role: 'Nghiên cứu trưởng & Định hướng nội dung',
      affiliation: 'Trường Đại học / Viện Nghiên cứu Văn hóa & Du lịch',
      taskDescription: 'Chịu trách nhiệm tổng thể về khung lý thuyết, khảo sát thực nghiệm nhận thức du khách và thiết kế giải pháp số hóa di sản.',
    },
    {
      id: 'm2',
      name: 'Trần Thị B (Thành viên nghiên cứu)',
      role: 'Khảo sát thực địa & Dữ liệu văn hóa',
      affiliation: 'Khoa Du lịch - Quản trị Khách sạn',
      taskDescription: 'Thu thập tư liệu lịch sử tại Đình thần Thắng Tam, Dinh Cô Long Hải và Miếu Bà Ngũ Hành; phỏng vấn nghệ nhân.',
    },
    {
      id: 'm3',
      name: 'Lê Hoàng C (Thành viên công nghệ)',
      role: 'Kỹ sư phát triển ứng dụng & Gamification',
      affiliation: 'Khoa Công nghệ Thông tin',
      taskDescription: 'Xây dựng kiến trúc giao diện tương tác, cơ chế Hộ chiếu số, Vòng quay may mắn và trải nghiệm 360° thực tế ảo.',
    },
    {
      id: 'm4',
      name: 'Phạm Thu D (Thành viên thiết kế)',
      role: 'Thiết kế Trải nghiệm Người dùng (UX/UI)',
      affiliation: 'Chuyên ngành Thiết kế Đồ họa / Mỹ thuật Ứng dụng',
      taskDescription: 'Sáng tạo hệ thống họa tiết Trống đồng Đông Sơn, hình tượng lồng đèn Việt Nam và phối màu nhận diện lễ hội.',
    },
  ]);

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-2">
          <Target size={15} className="text-[#D97706]" />
          <span>Đề tài Nghiên cứu Khoa học & Đổi mới Sáng tạo</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight font-heading">
          Dự Án Số Hóa Cổng Thông Tin Lễ Hội Vũng Tàu
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
          Nền tảng số được nghiên cứu và phát triển nhằm thúc đẩy nhận thức di sản và ý định hành vi tích cực của du khách đối với du lịch lễ hội truyền thống tại TP. Vũng Tàu, Việt Nam.
        </p>
      </div>

      {/* Rationale & Research Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-7 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-[#B91C1C]">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              Mục Tiêu Nghiên Cứu
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Nghiên cứu tập trung giải quyết bài toán: Làm thế nào để di sản lễ hội truyền thống miền biển (vốn mang tính tâm linh thiêng liêng) trở nên gần gũi, cuốn hút và kích thích hành vi khám phá của thế hệ trẻ (Gen Z, Millennials) cũng như du khách đại chúng?
          </p>
          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-1.5 shrink-0" />
              <span>Đánh giá mức độ nhận biết của du khách đối với 4 lễ hội cổ truyền tiêu biểu tại Vũng Tàu.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-1.5 shrink-0" />
              <span>Ứng dụng công nghệ Gamification (Hộ chiếu số, Vòng quay may mắn) để chuyển hóa nhận thức thành hành vi trẩy hội văn minh.</span>
            </li>
          </ul>
        </div>

        <div className="p-7 bg-[#FAF7F0] rounded-3xl border-2 border-[#D97706]/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-[#9A3412]">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <Award size={20} />
            </div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              Ý Nghĩa Thực Tiễn & Bảo Tồn
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Dự án là cầu nối sống động bảo tồn Di sản Văn hóa Phi vật thể Quốc gia. Nền tảng cung cấp dữ liệu xác thực, hướng dẫn ứng xử văn hóa nơi đền miếu, giảm thiểu thông tin sai lệch và thúc đẩy kinh tế du lịch bền vững cho ngư dân địa phương.
          </p>
          <div className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 text-xs text-[#92400E]">
            <strong>Tính ứng dụng cao:</strong> Có thể tích hợp quét mã QR trực tiếp tại các đình đền, trạm thông tin du lịch Bãi Trước, Bãi Sau và trên các phương tiện vận chuyển hành khách đến Vũng Tàu.
          </div>
        </div>
      </div>

      <CulturalDivider label="Đội ngũ nghiên cứu đề tài" />

      {/* Team Members Section (With user-editable toggle for report presentations) */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold font-heading text-stone-900">
              Thành Viên Nhóm Nghiên Cứu
            </h3>
            <p className="text-xs text-stone-500">
              (Các thông tin mẫu dưới đây có thể chỉnh sửa trực tiếp để phục vụ báo cáo khoa học)
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
          >
            {isEditing ? <Check size={14} className="text-emerald-600" /> : <Edit3 size={14} />}
            <span>{isEditing ? 'Lưu thông tin' : 'Chỉnh sửa nhanh'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map(member => (
            <div
              key={member.id}
              className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B91C1C] to-[#D97706] text-white flex items-center justify-center font-bold text-base shadow-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={member.name}
                        onChange={e => handleMemberChange(member.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm font-bold border rounded"
                      />
                    ) : (
                      <h4 className="text-base font-bold text-stone-900 font-heading">
                        {member.name}
                      </h4>
                    )}

                    {isEditing ? (
                      <input
                        type="text"
                        value={member.role}
                        onChange={e => handleMemberChange(member.id, 'role', e.target.value)}
                        className="w-full px-2 py-0.5 text-xs text-[#B91C1C] border rounded mt-1"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-[#B91C1C]">{member.role}</p>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={member.affiliation}
                    onChange={e => handleMemberChange(member.id, 'affiliation', e.target.value)}
                    className="w-full px-2 py-1 text-xs text-stone-500 border rounded"
                  />
                ) : (
                  <p className="text-xs text-stone-500 italic">{member.affiliation}</p>
                )}

                {isEditing ? (
                  <textarea
                    rows={3}
                    value={member.taskDescription}
                    onChange={e => handleMemberChange(member.id, 'taskDescription', e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded"
                  />
                ) : (
                  <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                    {member.taskDescription}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Scientific Collaboration */}
      <div className="p-8 bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              Liên kết Nghiên cứu & Phát triển
            </span>
            <h4 className="text-xl sm:text-2xl font-bold font-heading">
              Cùng lan tỏa di sản văn hóa Vũng Tàu
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
              Nhóm nghiên cứu hoan nghênh mọi ý kiến đóng góp từ các nhà nghiên cứu văn hóa, cơ quan quản lý du lịch và cộng đồng nhân dân địa phương để tiếp tục hoàn thiện nền tảng.
            </p>
          </div>

          <div className="space-y-3 text-xs text-stone-300 border-t md:border-t-0 md:border-l border-stone-700 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-amber-400 shrink-0" />
              <span>lehoivungtau.research@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-amber-400 shrink-0" />
              <span>(+84) 0254.3852.xxx</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="text-amber-400 shrink-0" />
              <span>TP. Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
