/**
 * Google Apps Script for ICE HOCKEY LEAGUE MANAGER
 * Current Phase: Phase 1
 * Objective: Set up the foundational GAS file for 'organizations' and 'teams' tables.
 */

// Define Schema Headers
const SCHEMA = {
  organizations: [
    'id', 'name', 'league_name', 'location', 'country', 'province_state',
    'logo_url', 'website', 'contact_email', 'contact_phone', 'is_active',
    'created_at', 'updated_at'
  ],
  teams: [
    'id', 'division_id', 'name', 'abbreviation', 'logo_url', 'home_color',
    'away_color', 'practice_venue_id', 'practice_schedule', 'status',
    'created_at', 'updated_at'
  ]
};

/**
 * Auto-create the 'organizations' and 'teams' sheets if they don't exist.
 */
function ensureSheetsExist() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  for (const sheetName in SCHEMA) {
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // Append the headers
      sheet.appendRow(SCHEMA[sheetName]);
      // Make the header row bold
      sheet.getRange(1, 1, 1, SCHEMA[sheetName].length).setFontWeight("bold");
    }
  }
}

/**
 * Helper to convert sheet rows into JSON objects
 */
function getSheetDataAsJson(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { error: `Sheet '${sheetName}' does not exist.` };
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return []; // Only headers or empty
  }

  const headers = data[0];
  const rows = data.slice(1);

  const jsonArray = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  return jsonArray;
}

/**
 * Handle GET requests to fetch data.
 * Expected query parameters:
 *   - table: the name of the table/sheet to fetch (e.g. 'organizations' or 'teams')
 */
function doGet(e) {
  // Always ensure sheets exist before serving requests
  ensureSheetsExist();

  const table = e?.parameter?.table;
  let responseData;

  if (table && SCHEMA[table]) {
    responseData = getSheetDataAsJson(table);
  } else {
    responseData = {
      error: "Please provide a valid 'table' parameter (e.g. ?table=teams)"
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests to append a new team.
 * Expected payload (JSON): team data matching the SCHEMA headers (excluding id, created_at, updated_at).
 */
function doPost(e) {
  ensureSheetsExist();

  let response;

  try {
    const postData = JSON.parse(e.postData.contents);
    const table = postData.table || e?.parameter?.table;

    if (table !== 'teams') {
      throw new Error("Only 'teams' appending is supported in this endpoint.");
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('teams');
    const data = sheet.getDataRange().getValues();

    // Auto-increment ID
    let newId = 1;
    if (data.length > 1) {
      // Assuming 'id' is the first column
      const existingIds = data.slice(1).map(row => parseInt(row[0]) || 0);
      newId = Math.max(...existingIds) + 1;
    }

    const timestamp = new Date().toISOString();

    // Prepare row array in the exact order of SCHEMA.teams
    const newRow = SCHEMA.teams.map(header => {
      if (header === 'id') return newId;
      if (header === 'created_at') return timestamp;
      if (header === 'updated_at') return timestamp;

      // Handle missing optional fields defensively
      return postData[header] !== undefined ? postData[header] : "";
    });

    sheet.appendRow(newRow);

    response = {
      success: true,
      message: `Team successfully appended.`,
      id: newId
    };

  } catch (error) {
    response = {
      success: false,
      error: error.message || "Failed to process POST request"
    };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
