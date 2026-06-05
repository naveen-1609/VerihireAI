/**
 * COPY THIS ENTIRE FILE into Google Apps Script (Extensions > Apps Script)
 * Then: Deploy > New deployment > Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Paste the NEW URL into GOOGLE_APPS_SCRIPT_URL in .env.local
 *
 * Test in browser: open the deployment URL — you should see {"success":true,...}
 */

var SPREADSHEET_ID = "1iL-km60jr5t4HOniFtI9rwKBArtb03C-xUXgm_eFhVQ";

var HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Company",
  "Website",
  "Role",
  "Company Size",
  "Interviews Per Month",
  "Problem",
  "Interest",
  "Notes",
];

function doGet() {
  return json_({ success: true, message: "Hire Guard webhook is live" });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.email || "",
      data.company || "",
      data.website || "",
      data.role || "",
      data.companySize || "",
      data.interviewsPerMonth || "",
      data.problem || "",
      data.interest || "",
      data.notes || "",
    ]);

    return json_({ success: true });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
