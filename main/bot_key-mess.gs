const KB_Registration = [[{ text: '✉️ Отправить заявку' }]]

const IM_newRequest = [[{ text: '✅ Предоставить доступ', callback_data: 'permissionLevel✅' }],
[{ text: '❌ Не предоставлять доступ', callback_data: 'permissionLevel❌' }]]
const IM_requestAcepted = [[{ text: '✅ Доступ предоставлен', callback_data: 'null' }]]
const IM_requestNotAcepted = [[{ text: '❌ Доступ отменен', callback_data: 'null' }]]

const KB_Start = [[{ text: '📟 Оценить команду' }]]
const IK_finishAddRateTheTeam = [{ text: '🏁 Оценки выставлены', callback_data: 'addRateTheTeamFinish' }]
const IM_getTeam = () => SpreadsheetApp.getActive().getSheetByName('📋 Список команд').getDataRange().getValues().slice(1).filter(r => r[0])
  .map(r => [{ text: r[0], callback_data: `setTeam|${r[0]}` }])

const MSG_errorInBot = '🤷 Упс... Что-то пошло не так. Нажмите на команду /start для перезапуска бота 🤖'

const MSG_getTeam = "💪 Выберите команду к которой хотите присоединиться"
const MSG_getTeamError = "❗️ Воспользуйтесь кнопками в сообщении выше ☝️"
const MSG_firstStart = "Для моего использования отправьте заявку на регистрацию ✉️"
const MSG_sendRegRequest = "Ваша заявка отправлена на рассмотрении 👀"
const MSG_requestNotAcepted = ", ваша заявка находитя на рассмотрении у администратора 💻\nОжидайте уведомление о завершении регистрации ✅"
const MSG_newRequest = (id, name, nick) => `Зашла новая заявка на регистрацию 📲
ID: ${id}
Имя: ${name}
Ник: ${nick ? nick : '-'}`
const MSG_requestAceptedUser = 'Поздравляем 🎉\nВаша заявка успешно подтверждена ✅'

const MSG_start = 'Чем могу быть для тебя полезен?'

const MSG_userHaveNoTeam = `❗️ Вы не состоите не в одной из команд. Ставить оценки вы не можете.\nЕсли есть вопросы, обратитесь к администратору.`
const MSG_userTeamEmpty = `❗️ В вашей команде никого, кроме вас нет. Ставить оценки некому 🤷‍♂️\nЕсли есть вопросы, обратитесь к администратору.`
const MSG_userTeam = `Пожалуйста выставьте оценки участникам вашей команды.\n
<b>Для выставления оценки, нажимайте на кнопки с участниками до необходимого кол-ва баллов.</b>\n
<i>Для перехода в главное меню нажмите кнопку "🏁 Оценки выставлены"</i>`
const MSG_rateTheTeam_other = `❗️ Пожалуйста используйте кнопки в сообщении выше 👆`

function checkDayTime(name) {
  let now = new Date(),
    message = ''
  if (now.getHours() >= 0 && now.getHours() < 5) {
    message = '<b>Доброй ночи, ' + name + '</b> 🌃\n\n'
  } else if (now.getHours() >= 5 && now.getHours() < 12) {
    message = '<b>Доброе утро, ' + name + '</b> 🌇\n\n'
  } else if (now.getHours() >= 12 && now.getHours() < 17) {
    message = '<b>Добрый день, ' + name + '</b> 🏙\n\n'
  } else {
    message = '<b>Добрый вечер, ' + name + '</b> 🌆\n\n'
  }
  return message
}


