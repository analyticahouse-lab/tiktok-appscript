function fetchTikTokReportAndWriteToSheet() {
  var accessToken = '61326e2db034686482a7f1b1ef1a4e0d947f726b';
  var spreadsheetId = '1sdDmxDng4XfEcjmWrQoXpwRhzvkzb893VemtU4Lxq7Y';
  var sheetName = 'tiktok_data';

  var baseUrl = 'https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/';
 var params = [
  'metrics=' + encodeURIComponent('["spend", "impressions", "clicks", "conversion"]'),  //--> https://business-api.tiktok.com/portal/docs?id=1751443967255553
  'data_level=AUCTION_CAMPAIGN',
  'end_date=2023-08-17',
  'order_type=ASC',
  'page_size=2000',
  'start_date=2023-01-01',
  'advertiser_id=7075961046044868610',
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
  Logger.log(responseData); // Log the response to check its structure
  
  var jsonResponse = JSON.parse(responseData);
  
  if (!jsonResponse.data || !Array.isArray(jsonResponse.data.list) || jsonResponse.data.list.length === 0) {
    Logger.log('Data is not an array or is empty.');
    return;
  }

  var data = jsonResponse.data.list;

  var headers = [];
  if (data[0].dimensions && data[0].metrics) {
    headers = Object.keys(data[0].dimensions).concat(Object.keys(data[0].metrics));
  } else {
    Logger.log('Dimensions or Metrics are missing in the data.');
    return;
  }

  var values = data.map(function (item) {
    if (!item.dimensions || !item.metrics) {
      Logger.log('Dimensions or Metrics are missing for an item in data.');
      return [];
    }
    var dimensions = Object.values(item.dimensions);
    var metrics = headers.slice(Object.keys(item.dimensions).length).map(function (metric) {
      return item.metrics[metric];
    });
    return dimensions.concat(metrics);
  });

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}
