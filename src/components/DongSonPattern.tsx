import React from 'react';

// Reusable decorative cultural components: Dong Son Sunburst, Chim Lạc, Traditional Lanterns, Dividers

export const DongSonSunburst: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 120, color = '#D97706' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric rings */}
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="100" cy="100" r="82" stroke={color} strokeWidth="2" opacity="0.75" />
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
      <circle cx="100" cy="100" r="54" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <circle cx="100" cy="100" r="38" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="100" cy="100" r="22" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />

      {/* Sun rays (14 pointed star center of Dong Son drum) */}
      {[...Array(14)].map((_, i) => {
        const angle = (i * 360) / 14;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <polygon
              points="100,68 96,90 100,94 104,90"
              fill={color}
              opacity="0.85"
            />
          </g>
        );
      })}

      {/* Flying Lac birds (Chim Lạc) orbiting */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 360) / 6 + 15;
        return (
          <g key={`bird-${i}`} transform={`rotate(${angle} 100 100)`}>
            {/* Stylized geometric Chim Lạc silhouette */}
            <path
              d="M100,24 C106,25 112,28 114,32 C110,31 106,32 102,35 C108,36 114,37 118,34 C116,38 110,40 105,39 C100,42 94,40 90,37 C95,35 98,30 100,24 Z"
              fill={color}
              opacity="0.75"
            />
          </g>
        );
      })}

      {/* Concentric triangular tooth pattern */}
      {[...Array(28)].map((_, i) => {
        const angle = (i * 360) / 28;
        return (
          <g key={`teeth-${i}`} transform={`rotate(${angle} 100 100)`}>
            <polygon points="100,75 98,79 102,79" fill={color} opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
};

export const VietnameseLantern: React.FC<{
  className?: string;
  size?: number;
  type?: 'round' | 'hexagon';
  color?: string;
}> = ({ className = '', size = 48, color = '#B91C1C' }) => {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 60 84"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hanging rope & top ring */}
      <line x1="30" y1="0" x2="30" y2="10" stroke="#D97706" strokeWidth="2" />
      <rect x="22" y="10" width="16" height="4" rx="1.5" fill="#B45309" />

      {/* Main lantern body */}
      <ellipse cx="30" cy="36" rx="24" ry="22" fill={color} />
      <ellipse cx="30" cy="36" rx="15" ry="22" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
      <line x1="30" y1="14" x2="30" y2="58" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.8" />

      {/* Warm inner lantern glow */}
      <circle cx="30" cy="36" r="10" fill="#FEF08A" fillOpacity="0.35" />

      {/* Bottom cap & golden tassel (tua rua lồng đèn) */}
      <rect x="23" y="58" width="14" height="4" rx="1" fill="#B45309" />
      <line x1="30" y1="62" x2="30" y2="82" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="27" y1="62" x2="26" y2="78" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="33" y1="62" x2="34" y2="78" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
};

export const CulturalDivider: React.FC<{
  label?: string;
  className?: string;
}> = ({ label, className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D97706]/40 to-[#D97706]" />
      <div className="flex items-center gap-2 text-[#B45309]">
        <DongSonSunburst size={24} color="#D97706" />
        {label && (
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9A3412]">
            {label}
          </span>
        )}
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D97706]/40 to-[#D97706]" />
    </div>
  );
};
