/**
 * API Service for Google Apps Script Bridge
 * Provides generic methods to fetch and insert data from/to the phase 1 sheets.
 */

// Replace this with the deployed GAS URL later via .env
const GAS_URL = import.meta.env.VITE_GAS_URL || "";

/**
 * Fetch data for a specific table
 */
export async function fetchTableData(tableName: string): Promise<any[]> {
  if (!GAS_URL) {
    console.warn("VITE_GAS_URL is not set. Data fetching disabled.");
    return [];
  }

  try {
    const response = await fetch(`${GAS_URL}?table=${tableName}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching table data for ${tableName}:`, error);
    // Defensive programming: always return empty array on failure so UI doesn't crash
    return [];
  }
}

/**
 * Insert a new row into a specific table
 */
export async function insertTableData(tableName: string, rowData: any): Promise<{ success: boolean, id?: number, error?: string }> {
  if (!GAS_URL) {
    return { success: false, error: "VITE_GAS_URL is not set. Data insertion disabled." };
  }

  try {
    // Append table to payload
    const payload = {
      table: tableName,
      ...rowData
    };

    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      // Use text/plain or no CORS mode based on GAS specific CORS handling if needed.
      // Often text/plain prevents preflight CORS issues with simple web apps in GAS.
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(`Error inserting data into ${tableName}:`, error);
    return { success: false, error: error.message || "Failed to insert data." };
  }
}
