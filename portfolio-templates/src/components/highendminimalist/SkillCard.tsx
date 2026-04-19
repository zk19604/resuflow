'use client';

import React, { useState } from 'react';

interface SkillCardProps {
  skillName: string;
  proficiency: number; // 0-100
  descriptor: string;
}

export function SkillCard({ skillName, proficiency, descriptor }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white border p-10 min-h-[140px] transition-all ${
        isHovered ? 'border-[#1A2744]' : 'border-[#E0E0E0]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h4 className="text-[11px] tracking-[0.15em] uppercase text-[#111111] mb-6 font-['DM_Sans'] font-bold">
        {skillName}
      </h4>
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#F0EFEB] mb-3">
        <div 
          className="h-full bg-[#1A2744] transition-all duration-300"
          style={{ width: `${proficiency}%` }}
        ></div>
      </div>

      <p className="font-['DM_Sans'] text-[12px] text-[#888888]">
        {descriptor}
      </p>
    </div>
  );
}
