import fs from 'fs';
import path from 'path';
// @ts-ignore
const pdfParse = require('pdf-parse');
// @ts-ignore
import mammoth from 'mammoth';

/**
 * Extract text from pdf file
 */
export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const fs = require('fs');
    const dataBuffer = fs.readFileSync(filePath);
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(dataBuffer);
    return data.text || '';
  } catch (error) {
    console.error(`Error reading PDF ${filePath}:`, error);
    return '';
  }
}

/**
 * Extract text from DOCX file
 */
export async function extractTextFromDOCX(filePath: string): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error(`Error reading DOCX ${filePath}:`, error);
    return '';
  }
}

/**
 * Read plain text file
 */
export function readTextFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading text file ${filePath}:`, error);
    return '';
  }
}

/**
 * Process document based on file extension
 */
export async function processDocument(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  
  switch (ext) {
    case '.pdf':
      return await extractTextFromPDF(filePath);
    case '.docx':
      return await extractTextFromDOCX(filePath);
    case '.txt':
    case '.md':
      return readTextFile(filePath);
    default:
      console.warn(`Unsupported file type: ${ext}`);
      return '';
  }
}

/**
 * Split text into chunks of specified size with overlap
 */
export function chunkText(
  text: string,
  chunkSize: number = 512,
  overlap: number = 50
): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim().length > 0) {
      chunks.push(chunk);
    }
  }
  
  return chunks;
}

/**
 * Get all document files from a directory recursively
 */
export function getDocumentFiles(dirPath: string): string[] {
  const files: string[] = [];
  const supportedExtensions = ['.pdf', '.docx', '.txt', '.md'];
  
  function traverse(currentPath: string) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (supportedExtensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dirPath);
  return files;
}

/**
 * Clean and normalize text
 */
export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
}