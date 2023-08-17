# TikTok API Report to Google Sheets

This Google Apps Script fetches data from the TikTok Business API and writes it to a Google Sheet. It's designed to retrieve campaign data and metrics such as spend, impressions, and reach. You can customize the metrics and dimensions to match your reporting needs.

- https://business-api.tiktok.com/portal/docs?id=1738864915188737

## Prerequisites

- Google Sheets
- TikTok Business API Access Token
- Google Apps Script knowledge

## Setup

1. Open your Google Sheets document.
2. Click on `Extensions` > `Apps Script`.
3. Clear the existing code in the script editor and paste the provided script.
4. Replace `'YOUR_ACCESS_TOKEN'` with your TikTok Business API access token.
5. Replace `'YOUR_SPREADSHEET_ID'` with the ID of your Google Spreadsheet.
6. Customize the metrics and dimensions in the `params` section if needed.
7. Save the script and run the `fetchTikTokReportAndWriteToSheet` function.

## Usage

1. Open your Google Sheets document.
2. Click on `Extensions` > `Apps Script`.
3. Run the `fetchTikTokReportAndWriteToSheet` function from the script editor.
4. The script will fetch data from the TikTok API and populate the sheet.

## Notes

- If you encounter issues or errors, refer to the troubleshooting section below.
- Make sure to review the TikTok API documentation for metrics and dimensions compatibility.
- Data formatting (e.g., scientific notation) might need adjustment in Google Sheets.
