const mammoth = require('mammoth');
const { PDFParse } = require('pdf-parse');

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
    const parser = new PDFParse({ data: buffer });
    const data = await withTimeout(parser.getText(), 30000, 'PDF parsing');
    await parser.destroy();
    return data.text;
  } else if (mimeType.includes('word') || mimeType.includes('docx')) {
    const result = await withTimeout(mammoth.extractRawText({ buffer }), 30000, 'DOCX parsing');
    return result.value;
  }
  throw new Error('Unsupported file type');
}

module.exports = { extractTextFromFile };