function checkUserPermissions(user) {
  //Проверка на разрешение использования бота
  let dataUsers = SpreadsheetApp.getActive().getSheetByName(SHT_USERS).getDataRange().getValues(),
    dataId = dataUsers.map(row => row[2]),
    idRow = dataId.indexOf(user.id);

  user.perm1lvl = idRow > -1 ? String(dataUsers[idRow][0]) : ''
  user.fio = idRow > -1 ? (dataUsers[idRow][5] ? dataUsers[idRow][5] : dataUsers[idRow][4]) : ''
  user.row = idRow + 1
  user.team = idRow > -1 ? dataUsers[idRow][6] : ''

  return user
}


function getRegistrationData(user) {
  let sheetUsers = SpreadsheetApp.getActive().getSheetByName(SHT_USERS)

  sheetUsers.getRange(sheetUsers.getLastRow() + 1, 1, 1, 5).setValues([['', new Date(), user.id, user.nickName, user.name]])
  sendMessage_InlineMenu(ADMIN, MSG_newRequest(user.id, user.name, user.nickName), IM_newRequest)
}

function adminSetPermissionLevel(user) {
  const sheetUsers = SpreadsheetApp.openById(SS_BOT).getSheetByName(SHT_USERS),
    permLvl = String(user.message.replace('permissionLevel', '')),
    messageId = String(user.contents.callback_query.message.message_id),
    message = user.contents.callback_query.message.text,

    userId = String(user.contents.callback_query.message.text.split('\n')[1].match(/[0-9]+/)),
    arrIds = sheetUsers.getRange(1, 3, sheetUsers.getLastRow()).getValues().map(row => String(row[0])),
    row = arrIds.indexOf(userId) + 1

  if (permLvl !== '❌') {
    sheetUsers.getRange(row, 1).setValue(permLvl)
    editMessageText(user.id, messageId, message, IM_requestAcepted)
    let menu = IM_getTeam()
    if (menu.length) {
      setProperty(userId, 'state', 'getTeam')
      sendMessage_InlineMenu(userId, MSG_requestAceptedUser + '\n\n' + MSG_getTeam, menu)
    } else {
      setProperty(userId, 'state', 'start')
      sendMessage_Keyboard(userId, MSG_requestAceptedUser, KB_Start)
    }


  } else {
    editMessageText(user.id, messageId, message, IM_requestNotAcepted)
  }
}