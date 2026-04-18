export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  portfolio: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skills {
  technical: string[];
  tools: string[];
  soft: string[];
  domain: string[];
  languages: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  name: string;
  description: string;
  tools: string[];
  link: string;
  type: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

export interface Volunteering {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  link: string;
}

export interface Reference {
  name: string;
  role: string;
  contact: string;
}

export interface Extras {
  interests: string[];
  memberships: string[];
  speakingEngagements: string[];
}

export interface UserProfile {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
  certifications: Certification[];
  projects: Project[];
  achievements: Achievement[];
  volunteering: Volunteering[];
  publications: Publication[];
  references: Reference[];
  extras: Extras;
}

export interface PortfolioConfig {
  template: string;
  palette?: {
    name: string;
    colors: string[];
  };
  font?: 'sans' | 'serif';
  sectionsVisible?: Record<string, boolean>;
  tone?: string;
}

export const defaultUserProfile: UserProfile = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    portfolio: ''
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: {
    technical: [],
    tools: [],
    soft: [],
    domain: [],
    languages: []
  },
  certifications: [],
  projects: [],
  achievements: [],
  volunteering: [],
  publications: [],
  references: [],
  extras: {
    interests: [],
    memberships: [],
    speakingEngagements: []
  }
};
