interface ContactSectionProps {
  profile: any;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const personalInfo = profile?.personalInfo || {};
  const name = personalInfo.name || 'Your Name';
  const firstName = name.split(' ')[0];
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const linkedin = personalInfo.linkedin || '';
  const github = personalInfo.github || '';
  const website = personalInfo.website || personalInfo.portfolio || '';
  
  const workExperience = profile?.workExperience || [];
  const currentRole = workExperience[0] || {};
  const role = currentRole.role || 'Professional';
  const company = currentRole.company || '';
  
  const getLinkedInUsername = () => {
    if (!linkedin) return '';
    const match = linkedin.match(/linkedin\.com\/in\/([^/]+)/);
    return match ? match[1] : linkedin.replace(/^https?:\/\//, '').replace(/^www\./, '');
  };
  
  const linkedinDisplay = getLinkedInUsername();
  
  const getLocationsDisplay = () => {
    if (location) return location;
    const locations = workExperience
      .map((exp: any) => exp.location)
      .filter(Boolean)
      .slice(0, 3);
    if (locations.length > 0) return locations.join(' · ');
    return '';
  };
  
  const locationsDisplay = getLocationsDisplay();
  
  const handleEmailClick = () => {
    if (email) {
      window.location.href = `mailto:${email}?subject=Hello ${firstName}`;
    }
  };
  
  const handleLinkedInClick = () => {
    if (linkedin) {
      window.open(linkedin, '_blank');
    }
  };

  return (
    <section id="contact" className="relative min-h-[600px] bg-[#0E0A04] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <div className="font-['DM_Sans'] font-bold text-[10px] text-[#6A5040] tracking-[0.25em] uppercase">
            GET IN TOUCH
          </div>
          <div className="h-3" />
          <div className="font-['Playfair_Display'] font-bold text-[40px] lg:text-[64px] leading-tight">
            <span className="text-[#F5E6C8]">Let's </span>
            <span 
              className="bg-gradient-to-r from-[#C9A96E] to-[#F5A623] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Connect
            </span>
          </div>
        </div>

        <div className="h-8 lg:h-12" />

        <div className="max-w-[900px] mx-auto">
          <div className="relative rounded-[20px] bg-[#1C1408] border border-[#C8A050]/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div 
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(255,255,255,0.025) 47px, rgba(255,255,255,0.025) 48px), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(255,255,255,0.025) 47px, rgba(255,255,255,0.025) 48px)'
              }}
            />
            
            <div 
              className="absolute inset-0 rounded-[20px] opacity-[0.02]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)'
              }}
            />

            <div className="relative p-8 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left column */}
                <div>
                  {email && (
                    <a 
                      href={`mailto:${email}`}
                      className="font-['Playfair_Display'] italic text-[18px] lg:text-[20px] text-[#F5E6C8] hover:text-[#C9A96E] transition-colors block"
                    >
                      {email}
                    </a>
                  )}

                  {phone && (
                    <>
                      <div className="h-3" />
                      <a 
                        href={`tel:${phone}`}
                        className="font-['DM_Sans'] text-[14px] lg:text-[15px] text-[#8B6B4A] hover:text-[#C9A96E] transition-colors block"
                      >
                        {phone}
                      </a>
                    </>
                  )}

                  {linkedin && (
                    <>
                      <div className="h-4" />
                      <a 
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['DM_Sans'] text-[14px] lg:text-[15px] text-[#C9A96E] hover:text-[#F5A623] transition-colors block"
                      >
                        {linkedinDisplay}
                      </a>
                    </>
                  )}

                  {github && (
                    <div className="h-3">
                      <a 
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['DM_Sans'] text-[13px] lg:text-[14px] text-[#8B6B4A] hover:text-[#C9A96E] transition-colors block"
                      >
                        {github.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                      </a>
                    </div>
                  )}

                  {locationsDisplay && (
                    <>
                      <div className="h-4" />
                      <div className="font-['DM_Sans'] text-[14px] lg:text-[15px] text-[#6A5040]">
                        {locationsDisplay}
                      </div>
                    </>
                  )}

                  <div className="h-8 lg:h-12" />
                  <div className="h-px bg-[#C8A050]/10" />
                  <div className="h-8 lg:h-10" />

                  <div className="space-y-3 lg:space-y-4">
                    {email && (
                      <button 
                        onClick={handleEmailClick}
                        className="w-full h-[52px] relative rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all bg-gradient-to-b from-[#C9A96E] to-[#8B6914] hover:from-[#D4B47E] hover:to-[#9B7924] cursor-pointer"
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-white/30 rounded-t-3xl" />
                        <span className="font-['DM_Sans'] font-bold text-[14px] text-[#1A1004]">
                          Send Message
                        </span>
                      </button>
                    )}
                    
                    {linkedin && (
                      <button 
                        onClick={handleLinkedInClick}
                        className="w-full h-[52px] relative bg-white/[0.05] border border-[#C8A050]/20 rounded-3xl hover:bg-white/[0.08] transition-all"
                      >
                        <span className="font-['DM_Sans'] font-bold text-[14px] text-[#C9A96E]">
                          View LinkedIn
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right column - Simple profile card */}
                <div className="flex items-center justify-center">
                  <div className="w-full bg-black/30 border border-[#C8A050]/10 rounded-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] p-8 lg:p-10 flex flex-col items-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-b from-[#C9A96E] to-[#8B6914] border-2 border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-center mb-4">
                      <span className="font-['Playfair_Display'] font-bold text-[24px] lg:text-[28px] text-[#1A1004]">
                        {initials}
                      </span>
                    </div>
                    
                    <div className="font-['Playfair_Display'] font-bold text-[18px] lg:text-[20px] text-[#F5E6C8] text-center">
                      {name}
                    </div>
                    
                    <div className="font-['DM_Sans'] text-[12px] lg:text-[13px] text-[#8B6B4A] text-center mt-1">
                      {role}
                    </div>
                    
                    {company && (
                      <div className="font-['DM_Sans'] text-[11px] text-[#6A5040] text-center mt-1">
                        {company}
                      </div>
                    )}
                    
                    {website && (
                      <>
                        <div className="h-4" />
                        <a 
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['DM_Sans'] text-[11px] text-[#C9A96E] hover:text-[#F5A623] transition-colors text-center"
                        >
                          {website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-10 pt-4 lg:pt-5 border-t border-[#C8A050]/[0.08]">
                <div className="font-['DM_Sans'] text-[10px] lg:text-[11px] text-[#5C4030] text-center">
                  © {new Date().getFullYear()} {name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}