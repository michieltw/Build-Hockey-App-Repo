/**
 * Google Apps Script for ICE HOCKEY LEAGUE MANAGER
 * Current Phase: Phase 1
 * Objective: Set up the foundational GAS file for core Phase 1 tables.
 */

// Define Schema Headers for all Phase 1 tables
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
  ],
  persons: [
    'id', 'first_name', 'last_name', 'date_of_birth', 'email', 'phone',
    'handedness', 'profile_photo_url', 'created_at', 'updated_at'
  ],
  roles: [
    'id', 'organization_id', 'name', 'description', 'permissions',
    'is_custom', 'created_at', 'updated_at'
  ],
  user_accounts: [
    'id', 'person_id', 'username', 'email', 'password_hash', 'role_id',
    'preferred_organization_id', 'is_active', 'last_login',
    'created_at', 'updated_at'
  ],
  seasons: [
    'id', 'organization_id', 'name', 'year', 'status', 'start_date',
    'end_date', 'registration_deadline', 'league_rules_version',
    'logo_url', 'color_scheme', 'created_at', 'updated_at'
  ],
  divisions: [
    'id', 'season_id', 'name', 'level', 'age_group', 'skill_level',
    'max_teams', 'playoff_format', 'logo_url', 'banner_url', 'created_at'
  ],
  venues: [
    'id', 'organization_id', 'name', 'city', 'province_state', 'address',
    'capacity', 'ice_surface_size', 'has_locker_rooms', 'parking_available',
    'wheelchair_accessible', 'amenities', 'logo_url', 'banner_url', 'created_at'
  ],
  players: [
    'id', 'person_id', 'jersey_number', 'position', 'height_cm', 'weight_kg',
    'handedness', 'draft_year', 'is_eligible_for_draft', 'status', 'created_at', 'updated_at'
  ],
  rosters: [
    'id', 'team_id', 'season_id', 'player_id', 'jersey_number', 'is_captain',
    'is_alternate_captain', 'join_date', 'contract_end_date', 'salary_cap_hit',
    'status', 'photo_url', 'created_at'
  ],
  personal_equipment: [
    'id', 'player_id', 'equipment_type', 'brand_id', 'model', 'serial_number',
    'condition', 'is_in_use', 'created_at', 'updated_at'
  ],
  lineups: [
    'id', 'game_id', 'team_id', 'player_id', 'position', 'line_number',
    'is_starting', 'created_at'
  ]
};

/**
 * Auto-create the defined sheets if they don't exist.
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
 * Handle POST requests to append a new row dynamically.
 * Expected payload (JSON):
 *  - table: Name of the sheet to insert to
 *  - ...data fields matching the schema (excluding id, created_at, updated_at).
 */
function doPost(e) {
  ensureSheetsExist();

  let response;

  try {
    const postData = JSON.parse(e.postData.contents);
    const table = postData.table || e?.parameter?.table;

    if (!table || !SCHEMA[table]) {
      throw new Error(`Invalid or missing table parameter: '${table}'`);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(table);
    const data = sheet.getDataRange().getValues();

    // Auto-increment ID
    let newId = 1;
    if (data.length > 1) {
      // Assuming 'id' is the first column
      const existingIds = data.slice(1).map(row => parseInt(row[0]) || 0);
      newId = Math.max(...existingIds) + 1;
    }

    const timestamp = new Date().toISOString();

    // Prepare row array in the exact order of SCHEMA[table]
    const newRow = SCHEMA[table].map(header => {
      if (header === 'id') return newId;
      if (header === 'created_at') return timestamp;
      if (header === 'updated_at') return timestamp;

      // Handle missing optional fields defensively
      return postData[header] !== undefined ? postData[header] : "";
    });

    sheet.appendRow(newRow);

    response = {
      success: true,
      message: `Row successfully appended to '${table}'.`,
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
