function debug (contents) {
  let sheetLog = SpreadsheetApp.getActive().getSheetByName(SHT_LOG)
  sheetLog.getRange('A2').setValue(contents)
  sheetLog.appendRow([contents])
}

function ddMMyyyy(date = new Date()) { return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'dd.MM.yyyy') }

function ddMMyyyyHHmm(date = new Date()) { return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm') }

function ddMMyyyyHHmmss(date = new Date()) { return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss') }

function numberWithSpaces(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }

//============================= PropertiesService =============================
function getProperty(id, property, defaultValue) {
  let userProperties = PropertiesService.getScriptProperties();
  return userProperties.getProperty(`${property}_${id}`) || defaultValue;
}

function getAllProperties() {
  let userProperties = PropertiesService.getScriptProperties(),
    allKeys = userProperties.getKeys();

  for (let i in allKeys) {
    let property = allKeys[i]
    Logger.log(property + ': ' + userProperties.getProperty(property))
  }
}

function setProperty(id = '500923962', property = 'state', value = 'start') {
  let userProperties = PropertiesService.getScriptProperties();
  userProperties.setProperty(`${property}_${id}`, value);
}

function deleteProperty(id = "", property = "trigger_sendShiftStartReminds") {
  let userProperties = PropertiesService.getScriptProperties();
  userProperties.deleteProperty(`${property}_${id}`)
}

function deleteProperties(id, properties) {
  let userProperties = PropertiesService.getScriptProperties()
  properties.forEach(property => userProperties.deleteProperty(`${property}_${id}`))
}

function deleteAllProperties() {
  let userProperties = PropertiesService.getScriptProperties();
  userProperties.deleteAllProperties()
}
//============================= PropertiesService =============================

