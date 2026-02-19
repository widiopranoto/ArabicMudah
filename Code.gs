// Paste this code into your Google Apps Script editor (Extensions > Apps Script)
// and Deploy as Web App with access set to "Anyone".

const SHEET_ID = "1a7jc_qhjK2A_YFkczt-tWsqY7rwkJEbT634yOm8slJg"; // Replace with your actual Sheet ID
const SHEET_NAME = "Sheet1";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.username) {
      return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Missing username" })).setMimeType(ContentService.MimeType.JSON);
    }

    const username = data.username;
    const level = data.level || 1;
    const xp = data.xp || 0;
    const score = data.score || 0; // Or total XP
    const lastUpdated = new Date();

    // Check if user already exists (to update instead of append)
    const range = sheet.getDataRange();
    const values = range.getValues();
    let userRowIndex = -1;

    // Assuming column B (index 1) is Username
    for (let i = 1; i < values.length; i++) {
      if (values[i][1] === username) {
        userRowIndex = i + 1; // 1-based index
        break;
      }
    }

    if (userRowIndex > 0) {
      // Update existing row
      // Columns: A=Timestamp, B=Username, C=Level, D=XP, E=Total Score, F=Last Updated
      sheet.getRange(userRowIndex, 3).setValue(level); // C
      sheet.getRange(userRowIndex, 4).setValue(xp);    // D
      sheet.getRange(userRowIndex, 5).setValue(score); // E
      sheet.getRange(userRowIndex, 6).setValue(lastUpdated); // F
    } else {
      // Append new row
      sheet.appendRow([new Date(), username, level, xp, score, lastUpdated]);
    }

    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "row": userRowIndex })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
