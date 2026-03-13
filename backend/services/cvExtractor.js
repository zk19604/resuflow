const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CV_SCHEMA_PROMPT = `
You are a professional CV parser that handles ALL types of professionals — including marketers, 
managers, HR personnel, designers, doctors, lawyers, teachers, engineers, and more.
Extract structured data from the CV text below and return ONLY valid JSON.
No extra text, no markdown, no code blocks — just raw JSON.

JSON Schema to follow:
{
  "personalInfo": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "portfolio": ""
  },
  "summary": "",
  "workExperience": [
    {
      "company": "",
      "role": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present",
      "description": "",
      "achievements": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "grade": ""
    }
  ],
  "skills": {
    "technical": [],
    "tools": [],
    "soft": [],
    "domain": [],
    "languages": []
  },
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": "YYYY-MM"
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "tools": [],
      "link": "",
      "type": ""
    }
  ],
  "achievements": [
    {
      "title": "",
      "description": "",
      "date": "YYYY-MM"
    }
  ],
  "volunteering": [
    {
      "organization": "",
      "role": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present",
      "description": ""
    }
  ],
  "publications": [
    {
      "title": "",
      "publisher": "",
      "date": "YYYY-MM",
      "link": ""
    }
  ],
  "references": [
    {
      "name": "",
      "role": "",
      "contact": ""
    }
  ],
  "extras": {
    "interests": [],
    "memberships": [],
    "speakingEngagements": []
  }
}

Rules:
- For non-technical professionals, "skills.technical" and "skills.tools" may be empty — that is fine
- "skills.domain" should capture industry-specific expertise e.g. "Brand Strategy", "Patient Care", "Financial Modelling", "Curriculum Design"
- "projects" can include marketing campaigns, research papers, events organized, case studies — not just software
- "projects.tools" should list any tools used e.g. "Canva", "Excel", "SPSS", "Figma", "Stethoscope" — not just code
- "projects.type" should describe the nature e.g. "Marketing Campaign", "Research", "Software", "Event", "Design"
- "achievements" should capture awards, honors, scholarships, competitions won
- Leave fields as empty string "" or empty array [] if not found — never omit a field
- Extract ALL information present, do not skip any section

CV Text:
`;

async function extractCVData(rawText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = CV_SCHEMA_PROMPT + rawText;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  const cleaned = responseText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  const parsed = JSON.parse(cleaned);
  return parsed;
}

module.exports = { extractCVData };