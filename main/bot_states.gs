function makeAction(condition, action) {
  return {
    "condition": condition,
    "action": action
  }
}

//===== ===== ===== ===== ===== State registration ===== ===== ===== ===== =====
const ST_userNotRegistred = makeAction( //регистрация
  user => user.row === 0 && user.contents.hasOwnProperty('message') && user.message !== KB_Registration[0][0].text,
  user => {
    setProperty(user.id, 'state', 'registration')

    sendMessage_Keyboard(user.chat, checkDayTime(user.name) + MSG_firstStart, KB_Registration)
  })

const ST_registrationRequest = makeAction( //данные для регистрации отправлены
  user => user.perm1lvl === '' && user.row === 0 && user.message === KB_Registration[0][0].text,
  user => {
    sendMessage_KeyboardRemove(user.chat, MSG_sendRegRequest)
    getRegistrationData(user)
  })

const ST_userNotVerifed = makeAction( //регистрация
  user => user.perm1lvl === '' && user.row > 0,
  user => {
    setProperty(user.id, 'state', 'registration')

    sendMessage_KeyboardRemove(user.chat, user.name + MSG_requestNotAcepted)
  })
//===== ===== ===== ===== ===== State registration ===== ===== ===== ===== =====


//===== ===== ===== ===== ===== State getTeam ===== ===== ===== ===== =====
const ST_getTeam = makeAction( //стартовая страница
  user => user.perm1lvl !== '' && user.message,
  user => {
    if (user.message.match(/setTeam/)) {
      let team = user.message.split('|')[1]
      SpreadsheetApp.getActive().getSheetByName(SHT_USERS).getRange(user.row, 7).setValue(team)
      setProperty(user.id, 'state', 'start')
      sendMessage_Keyboard(user.chat, checkDayTime(user.name) + MSG_start, KB_Start)
    } else {
      sendMessage(user.chat, MSG_getTeamError)
    }
  })
//===== ===== ===== ===== ===== State getTeam ===== ===== ===== ===== =====



//===== ===== ===== ===== ===== State start ===== ===== ===== ===== =====
const ST_toStart = makeAction( //стартовая страница
  user => user.perm1lvl !== '' && user.message === '/start',
  user => {
    setProperty(user.id, 'state', 'start')
    sendMessage_Keyboard(user.chat, checkDayTime(user.name) + MSG_start, KB_Start)
  })

const ST_rateTheTeam = makeAction( //стартовая страница
  user => user.perm1lvl !== '' && user.message === KB_Start[0][0].text,
  user => {
    let team = user.team
    if (team) {
      let teamMates = SpreadsheetApp.getActive().getSheetByName(SHT_USERS).getDataRange().getValues().filter(r => r[0] && r[2].toString() !== user.id && r[6] == team)
      if (teamMates.length) {
        let inlineMenu = teamMates.map((r, i) => [{ text: `0 баллов - ${r[5] ? r[5] : r[4]}`, callback_data: `addRateTheTeam|${r[2]}` }])
        inlineMenu.push(IK_finishAddRateTheTeam)
        sendMessage_InlineMenu(user.chat, MSG_userTeam, inlineMenu)
        setProperty(user.id, 'state', 'rateTheTeam1')
      } else { sendMessage(user.chat, MSG_userTeamEmpty) }
    } else { sendMessage(user.chat, MSG_userHaveNoTeam) }
  })
//===== ===== ===== ===== ===== State start ===== ===== ===== ===== =====

//===== ===== ===== ===== ===== State rateTheTeam ===== ===== ===== ===== =====
const ST_rateTheTeam1 = makeAction( //стартовая страница
  user => user.message,
  user => {
    if (user.message.match(/addRateTheTeamFinish/)) {
      let now = new Date()
      let menu = user.contents.callback_query.message.reply_markup.inline_keyboard
      let arrToPaste = []
      menu.forEach(k => {
        Logger.log(JSON.stringify(k))
        if (k[0].text.match(/^\d+/)) {
          arrToPaste.push([now, user.team, user.id, user.fio, k[0].callback_data.split('|')[1], k[0].text.match(/ \- (.+)$/)[1], k[0].text.match(/^\d+/)[0]])
        }
      })
      if (arrToPaste.length) {
        const sheetTo = SpreadsheetApp.getActive().getSheetByName('📟 Оценки')
        sheetTo.getRange(sheetTo.getLastRow() + 1, 1, arrToPaste.length, arrToPaste[0].length).setValues(arrToPaste)
      }
      setProperty(user.id, 'state', 'start')
      sendMessage_Keyboard(user.chat, checkDayTime(user.name) + MSG_start, KB_Start)

    } else if (user.message.match(/addRateTheTeam/)) {
      let menu = user.contents.callback_query.message.reply_markup.inline_keyboard
      let newMenu = menu.map(k => {
        if (k[0].callback_data == user.message) {
          let rate = k[0].text.match(/^\d+/)[0] * 1 + 1
          if (rate > 10) { rate = 0 }
          k[0].text = k[0].text.replace(/^\d+/, rate)
        }
        return k
      })
      editMessageReplyMarkup(user.chat, user.contents.callback_query.message.message_id, newMenu)

    } else {
      sendMessage(user.chat, MSG_rateTheTeam_other)
    }
  })
//===== ===== ===== ===== ===== State rateTheTeam ===== ===== ===== ===== =====

const states = {
  'registration': [ST_toStart, ST_userNotRegistred, ST_registrationRequest, ST_userNotVerifed],
  'getTeam': [ST_toStart, ST_userNotVerifed, ST_userNotRegistred, ST_getTeam],
  'start': [ST_rateTheTeam, ST_toStart, ST_userNotVerifed, ST_userNotRegistred],

  'rateTheTeam1': [ST_toStart, ST_userNotVerifed, ST_userNotRegistred, ST_rateTheTeam1],
}