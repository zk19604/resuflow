'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/neumorphism/Navigation';
import { Hero } from '@/components/neumorphism/Hero';
import { About, Statistics } from '@/components/neumorphism/AboutAndStats';
import { Skills } from '@/components/neumorphism/ServicesAndSkills';
import { Portfolio } from '@/components/neumorphism/Portfolio';

export default function NeumorphismPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get profile data from localStorage
    const stored = localStorage.getItem("resuflow_profile");
    if (stored) {
      try {
        const parsedProfile = JSON.parse(stored);
        setProfile(parsedProfile);
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#E8E3DC',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <p style={{ color: '#7A7268' }}>Loading your portfolio...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#E8E3DC',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#3D3830', marginBottom: '16px' }}>No Profile Data Found</h2>
          <p style={{ color: '#7A7268' }}>Please upload your CV first.</p>
        </div>
      </div>
    );
  }

    return (
    <main className="neumorphism-template"> {/* Scoped class wrapper */}
      <Navigation profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Statistics profile={profile} />
      <Skills profile={profile} />
      <Portfolio profile={profile} />
      
      <footer style={{ 
        background: '#DEDAD3', 
        padding: '40px 24px', 
        textAlign: 'center' 
      }}>
        <div className="section-divider max-w-[1400px] mx-auto mb-8" />
        <p style={{ 
          fontFamily: 'DM Sans', 
          fontSize: '12px', 
          color: '#A09890' 
        }}>
          © {new Date().getFullYear()} {profile?.personalInfo?.name || 'Your Name'}. 
          Built with ResuFlow
        </p>
      </footer>
    </main>
  );
}