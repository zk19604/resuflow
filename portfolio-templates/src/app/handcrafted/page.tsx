import React from 'react';

export default function Handcrafted() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] p-6 md:p-20 selection:bg-[#E5E1DA]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&family=Inter:wght@300;400&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto border border-[#E5E1DA] bg-white p-12 md:p-24 shadow-sm">
        <header className="mb-24 flex justify-between items-start">
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-5xl font-light italic mb-2">Khadija A.</h1>
            <p className="font-['Inter'] text-[10px] uppercase tracking-[0.4em] text-[#8C857D]">CS Student & Developer</p>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#8C857D]">
            Est. 2026
          </div>
        </header>

        <section className="space-y-20">
          <div className="max-w-md">
            <h2 className="font-['Inter'] text-[9px] uppercase tracking-[0.3em] text-[#A69D93] mb-6">Philosophy</h2>
            <p className="font-['Cormorant_Garamond'] text-3xl font-light leading-snug italic">
              "Focusing on the intersection of technical precision and aesthetic simplicity."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#F0EDE8] pt-12">
            <div>
              <h3 className="font-['Inter'] text-[9px] uppercase tracking-[0.3em] text-[#A69D93] mb-4">Projects</h3>
              <p className="font-['Cormorant_Garamond'] text-xl">ResuFlow — Automated Portfolio Engine</p>
            </div>
            <div className="flex flex-col justify-end">
              <span className="text-xs underline underline-offset-4 cursor-pointer hover:text-[#8C857D] transition-colors">
                View Archive
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}