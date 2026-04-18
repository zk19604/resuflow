import React from 'react';

interface ExperienceRowProps {
  yearRange: string;
  title: string;
  company: string;
  description: string;
  location: string;
  achievement: string;
}

export function ExperienceRow({ yearRange, title, company, description, location, achievement }: ExperienceRowProps) {
  return (
    <div className="flex items-start gap-8 py-[72px] border-b border-[#DDDDDA]">
      {/* Year Range - 15% */}
      <div className="w-[15%] flex-shrink-0">
        <p className="text-[13px] tracking-[0.08em] uppercase text-[#888888] font-['DM_Sans']">
          {yearRange}
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-[72px] bg-[#DDDDDA] flex-shrink-0"></div>

      {/* Center - 55% */}
      <div className="w-[55%] flex-shrink-0">
        <h3 className="font-['Playfair_Display'] font-semibold text-[24px] text-[#111111] mb-1.5">
          {title}
        </h3>
        <p className="font-['DM_Sans'] italic text-[15px] text-[#666666] mb-4">
          {company}
        </p>
        <p className="font-['DM_Sans'] text-[14px] text-[#777777] leading-[1.75] max-w-[560px]">
          {description}
        </p>
      </div>

      {/* Right - 30% */}
      <div className="w-[30%] flex-shrink-0 text-right">
        <p className="font-['DM_Sans'] text-[13px] text-[#888888] mb-2">
          {location}
        </p>
        <p className="font-['DM_Sans'] font-bold text-[13px] text-[#333333]">
          {achievement}
        </p>
      </div>
    </div>
  );
}
