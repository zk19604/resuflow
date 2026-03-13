const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractTextFromFile(buffer, mimeType) {
  if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (mimeType.includes('word') || mimeType.includes('docx')) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  throw new Error('Unsupported file type');
}

module.exports = { extractTextFromFile };