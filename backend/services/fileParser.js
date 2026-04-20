const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

async function extractTextFromFile(buffer, mimeType) {
  if (mimeType === 'application/pdf') {
    const data = await withTimeout(pdfParse(buffer), 30000, 'PDF parsing');
    return data.text;
  } else if (mimeType.includes('word') || mimeType.includes('docx')) {
    const result = await withTimeout(mammoth.extractRawText({ buffer }), 30000, 'DOCX parsing');
    return result.value;
  }
  throw new Error('Unsupported file type');
}

module.exports = { extractTextFromFile };