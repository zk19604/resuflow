import React from 'react';

interface AchievementCardProps {
  stat: string;
  label: string;
  description: string;
}

export function AchievementCard({ stat, label, description }: AchievementCardProps) {
  return (
    <div className="border border-white/15 p-12 min-h-[220px] flex flex-col">
      <h3 className="font-['Playfair_Display'] font-bold text-[72px] text-white mb-4 leading-none">
        {stat}
      </h3>
      <p className="font-['DM_Sans'] text-[11px] tracking-[0.2em] uppercase text-white/55 mb-3">
        {label}
      </p>
      <p className="font-['DM_Sans'] text-[14px] text-white/75 leading-[1.75]">
        {description}
      </p>
    </div>
  );
}
