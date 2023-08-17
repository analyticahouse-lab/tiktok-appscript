function fetchTikTokReportAndWriteToSheet() {
  var accessToken = 'ACCESS_TOKEN';
  var spreadsheetId = 'SHEET_ID';
  var sheetName = 'SHEET_NAME';

  var baseUrl = 'https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/';
 var params = [
  'metrics=' + encodeURIComponent('["spend", "impressions", "clicks", "conversion"]'),  //--> https://business-api.tiktok.com/portal/docs?id=1751443967255553
  'data_level=AUCTION_CAMPAIGN',
  'end_date=2023-08-10',
  'order_type=ASC',
  'page_size=2000',
  'start_date=2023-01-01',
  'advertiser_id=ADVERTISER_ID'
  'service_type=AUCTION',
  'report_type=BASIC',
  'page=1',
  'dimensions=' + encodeURIComponent('["campaign_id", "stat_time_day"]') //--> https://business-api.tiktok.com/portal/docs?id=1751443956638721
].join('&');

  var fullUrl = baseUrl + '?' + params;

  var options = {
    method: 'get',
    headers: {
      'Access-Token': accessToken
    }
  };

  var response = UrlFetchApp.fetch(fullUrl, options);
  var responseData = response.getContentText();
  var data = JSON.parse(responseData).data.list; // Extract the 'list' array

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var headers = Object.keys(data[0].dimensions).concat(Object.keys(data[0].metrics));

  var values = data.map(function (item) {
    var dimensions = Object.values(item.dimensions);
    var metrics = headers.slice(Object.keys(item.dimensions).length).map(function (metric) {
      return item.metrics[metric];
    });
    return dimensions.concat(metrics);
  });

  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}
