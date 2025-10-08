import login from '../../helpers/login-helper/login.js';
import checkLoginText from '../../helpers/login-helper/checkLoginText.js';
import fs from 'fs';
import path from 'path';

// Simple helper to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Extract all emails from text
function extractEmails(text) {
  if (!text) return [];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  return Array.from(new Set((text.match(emailRegex) || []).map(e => e.toLowerCase())));
}

// Extract all phone numbers from text
function extractPhones(text) {
  if (!text) return [];
  const phoneRegex = /\b\d{3,4}[-\s]?\d{3,4}[-\s]?\d{3,4}\b/g;
  return Array.from(new Set(text.match(phoneRegex) || []));
}

// Build CSV row
function buildCsvRow({ from, to, date, refNumber, loc, body, emails, phones, scrapedAt }) {
  return [
    `"${from}"`,
    `"${to}"`,
    `"${date}"`,
    `"${refNumber}"`,
    `"${loc}"`,
    `"${body.replace(/"/g, '""')}"`,
    `"${emails.join(';')}"`,
    `"${phones.join(';')}"`,
    `"${scrapedAt}"`,
  ].join(',');
}

// Append row to CSV
function appendRowToCsv(csvPath, rowObject) {
  ensureDirectoryExists(csvPath);
  const header = 'From,To,Date,RefNumber,Location,Body,Emails,Phones,ScrapedAt\n';
  const line = buildCsvRow(rowObject) + '\n';
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, header + line, 'utf8');
  } else {
    fs.appendFileSync(csvPath, line, 'utf8');
  }
}

// Parse CSV line properly handling quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }
  
  result.push(current); // Add the last field
  return result;
}

// Load existing message bodies for deduplication
function loadExistingMessageBodies(csvPath) {
  const bodies = new Set();
  if (!fs.existsSync(csvPath)) return bodies;

  try {
    const content = fs.readFileSync(csvPath, 'utf8');
    const lines = content.split('\n').slice(1); // skip header
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      try {
        const parts = parseCSVLine(line);
        if (parts.length >= 6) {
          const body = parts[5]; // Body is at index 5 (0-based)
          if (body && body.trim()) {
            bodies.add(body.trim());
          }
        }
      } catch (err) {
        console.warn('Error parsing CSV line:', line, err);
      }
    }
  } catch (err) {
    console.error('Error reading CSV file:', err);
  }
  
  console.log(`Loaded ${bodies.size} existing message bodies for deduplication`);
  return bodies;
}

// Main function to extract messages
export async function extractMessages(csvPath = './output/messages.csv') {
  const existingBodies = loadExistingMessageBodies(csvPath);
  let newMessagesCount = 0;
  let duplicatesSkipped = 0;

  try {
    // Find the parent container
    const container = await $('android=new UiSelector().className("android.view.View").instance(11)');
    const chatItems = await container.$$(
      'android=new UiSelector().className("android.view.View")'
    );

    console.log(`Found ${chatItems.length} messages.`);

    for (let i = 0; i < chatItems.length; i++) {
      try {
        const textViews = await chatItems[i].$$('android=new UiSelector().className("android.widget.TextView")');
        if (textViews.length < 5) continue; // skip malformed entries

        const from = await textViews[0].getText();
        const to = await textViews[1].getText();
        const date = await textViews[2].getText();
        const refNumberFull = await textViews[3].getText();
        const body = await textViews[4].getText();
        const [refNumber, loc] = refNumberFull.split('|').map(s => s.trim());

        // Deduplication check using message body
        const bodyTrimmed = body.trim();
        if (existingBodies.has(bodyTrimmed)) {
          console.log(`Skipping duplicate message: "${bodyTrimmed.substring(0, 50)}..."`);
          duplicatesSkipped++;
          continue;
        }
        
        // Add to existing bodies set to prevent duplicates within this session
        existingBodies.add(bodyTrimmed);

        // Extract emails and phones
        const emails = extractEmails(body);
        const phones = extractPhones(body);

        const scrapedAt = new Date().toISOString();

        // Print to console
        console.log(`Message ${i}:`, { from, to, date, refNumber, loc, body, emails, phones, scrapedAt });

        // Append to CSV
        appendRowToCsv(csvPath, { from, to, date, refNumber, loc, body, emails, phones, scrapedAt });
        newMessagesCount++;

      } catch (err) {
        console.error(`Error processing message ${i}:`, err);
      }
    }

    console.log(`\nSummary: ${newMessagesCount} new messages saved, ${duplicatesSkipped} duplicates skipped.`);

  } catch (err) {
    console.error('Error reading container:', err);
  }
}

async function handleLoginOrExtract() {
  const isLoginTextDisplayed = await checkLoginText();
  console.log('Is "Login" TextView displayed?', isLoginTextDisplayed);

  if (isLoginTextDisplayed) {
    await login();
  } else {
    await extractMessages();
  }
}

describe('Mobile App Chat Extraction', () => {
  it('should login or extract messages based on login state', async () => {
    await driver.activateApp('com.advtechgrp.corrlinks.chat.text');
    await handleLoginOrExtract();
  });
});