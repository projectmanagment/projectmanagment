const TOKEN_BOT = '5270173819:AAGBVChXPjV0iOy7jsOGzGlV50QN75gl8GE'
const URL_BOT = 'https://api.telegram.org/bot' + TOKEN_BOT
const URL_WEBAPP = 'https://script.google.com/macros/s/AKfycbxy_ccFmnIfPWrrw9pByXDiDz4QxmXaZJuCwf53wbqAxTWj8Kuyf85GDQd7D7sA1lng/exec'
const SS_BOT = '1IL0jcYpYLCFk42erdl8GuhWL_EN8M7yy23HYp0C3KwQ'
const ADMIN = '932107048'

const SHT_USERS = '👨‍💼 Пользователи'
const SHT_LOG = 'Log'


//Library - 1DSyxam1ceq72bMHsE6aOVeOl94X78WCwiYPytKi7chlg4x5GqiNXSw0l
Logger = BetterLog.useSpreadsheet(SS_BOT);

function setWebhook() {
  const response = UrlFetchApp.fetch(URL_BOT + '/setWebhook?url=' + URL_WEBAPP);
  Logger.log(response.getContentText());
}

function deleteWebhook() {
  const response = UrlFetchApp.fetch(URL_BOT + '/deleteWebhook?url=' + URL_WEBAPP);
  Logger.log(response.getContentText());
}
