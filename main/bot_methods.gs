function makeRequest(payload, urlPart) {
  const data = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  }

  let response = UrlFetchApp.fetch(`${URL_BOT}${urlPart}`, data)
  if (!JSON.parse(response).ok) { Logger.log(response) }
  return response
}



function sendMessage(chat_id, text, reply_to_message) {
  const payload = {
    chat_id: chat_id,
    text: text,
    parse_mode: 'HTML'
  }
  if (reply_to_message) { payload.reply_to_message = reply_to_message }

  return makeRequest(payload, '/sendMessage')
}

function sendMessage_Keyboard(chat_id, text, keyboard) {
  const payload = {
    chat_id: chat_id,
    text: text,
    parse_mode: 'HTML',
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: true,
      one_time_keyboard: true
    }
  }

  return makeRequest(payload, '/sendMessage')
}

function sendMessage_InlineMenu(chat_id, text, inline_keyboard) {
  const payload = {
    chat_id: chat_id,
    text: text,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: inline_keyboard
    }
  }

  return makeRequest(payload, '/sendMessage')
}

function sendMessage_KeyboardRemove(chat_id, text) {
  const payload = {
    chat_id: chat_id,
    text: text,
    parse_mode: 'HTML',
    reply_markup: {
      remove_keyboard: true
    }
  }

  return makeRequest(payload, '/sendMessage')
}

function editMessageText(chat_id, message_id, text, replyMarkup) {
  const payload = {
    chat_id: chat_id,
    message_id: message_id,
    text: text,
    parse_mode: 'HTML',
  }
  if (replyMarkup) {
    payload.reply_markup = {
      inline_keyboard: replyMarkup,
    }
  }

  return makeRequest(payload, '/editMessageText')
}

function editMessageReplyMarkup(chat_id, message_id, replyMarkup) {
  const payload = {
    chat_id: chat_id,
    message_id: message_id,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: replyMarkup,
    }
  }

  return makeRequest(payload, '/editMessageReplyMarkup')
}

function deleteMessage(chat_id, messageId) {
  const payload = {
    chat_id: chat_id,
    message_id: messageId
  }

  return makeRequest(payload, '/deleteMessage')
}

function sendDocument(chat_id, caption, document) {
  const payload = {
    chat_id: chat_id,
    caption: caption,
    parse_mode: 'HTML',
    document: document,
  }

  return makeRequest(payload, '/sendDocument')
}

function sendChatAction(chat_id, type) {
  const payload = {
    chat_id: chat_id,
    action: type
  }

  return makeRequest(payload, '/sendChatAction')
}

function sendAnswer_InlineQuery(inline_query_id, result) {
  const payload = {
    method: 'answerInlineQuery',
    inline_query_id: inline_query_id,
    cacheTime: 60,
    results: JSON.stringify(result)
  }

  return makeRequest(payload, '/')
}