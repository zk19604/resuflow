import { NextRequest, NextResponse } from 'next/server';
import { UserProfile } from '@/types/userProfile';

const MOCK_PROFILES: Record<string, UserProfile> = {
  'demo': {
    personalInfo: {
      name: 'Alex Morgan',
      email: 'alex@example.com',
      phone: '+1 555 123 4567',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/alexmorgan',
      github: 'https://github.com/alexmorgan',
      website: 'https://alexmorgan.dev',
      portfolio: ''
    },
    summary: 'I craft spatial interfaces and design systems that live at the intersection of beauty and function — from concept to code, across platforms and dimensions.',
    workExperience: [
      {
        company: 'TechCorp',
        role: 'Senior Product Designer',
        startDate: '2021-03',
        endDate: 'Present',
        description: 'Leading design for the core product team, focusing on design systems and user experience.',
        achievements: ['Reduced design debt by 40%', 'Launched design system used by 5 teams', 'Mentored 3 junior designers']
      },
      {
        company: 'StartupXYZ',
        role: 'Product Designer',
        startDate: '2018-06',
        endDate: '2021-02',
        description: 'First design hire, built the design function from scratch.',
        achievements: ['Grew user base from 1K to 50K', 'Won 2 design awards', 'Hired and managed design team']
      }
    ],
    education: [
      {
        institution: 'Stanford University',
        degree: 'M.S.',
        field: 'Computer Science',
        startDate: '2016-09',
        endDate: '2018-06',
        grade: '3.9'
      },
      {
        institution: 'UC Berkeley',
        degree: 'B.A.',
        field: 'Design',
        startDate: '2012-09',
        endDate: '2016-05',
        grade: '3.7'
      }
    ],
    skills: {
      technical: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL'],
      tools: ['Figma', 'Framer', 'Sketch', 'Adobe CC', 'Notion'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Mentoring'],
      domain: ['Product Design', 'Design Systems', 'UX Research', 'Accessibility'],
      languages: ['English (Native)', 'Spanish (Conversational)', 'Mandarin (Basic)']
    },
    certifications: [
      { name: 'Google UX Design Certificate', issuer: 'Google', date: '2023-01' },
      { name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2022-08' }
    ],
    projects: [
      {
        name: 'DesignSystem Pro',
        description: 'An open-source design system with 50+ components',
        tools: ['React', 'Storybook', 'Figma'],
        link: 'https://github.com/alex/designsystem',
        type: 'Open Source'
      },
      {
        name: 'Portfolio Generator',
        description: 'AI-powered portfolio builder',
        tools: ['Next.js', 'OpenAI', 'Vercel'],
        link: 'https://example.com',
        type: 'Side Project'
      }
    ],
    achievements: [
      { title: 'Top Designer Award', description: 'Recognized for outstanding design contributions', date: '2023-12' },
      { title: 'Hackathon Winner', description: 'First place in company hackathon', date: '2022-06' }
    ],
    volunteering: [
      {
        organization: 'Code.org',
        role: 'Volunteer Instructor',
        startDate: '2020-01',
        endDate: 'Present',
        description: 'Teaching web development to high school students'
      }
    ],
    publications: [
      { title: 'The Future of Design Systems', publisher: 'Medium', date: '2023-09', link: 'https://medium.com/@alex/design-systems' }
    ],
    references: [
      { name: 'Sarah Chen', role: 'VP Product at TechCorp', contact: 'sarah@example.com' }
    ],
    extras: {
      interests: ['Photography', 'Hiking', 'Coffee Roasting'],
      memberships: ['UXPA', ' IxDA'],
      speakingEngagements: ['DesignConf 2023', 'TechTalk SF']
    }
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  
  const profile = MOCK_PROFILES[username];
  
  if (!profile) {
    return NextResponse.json(
      { error: 'Profile not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(profile);
}
