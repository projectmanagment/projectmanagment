function main(user) {
  const currentState = getProperty(user.id, 'state', 'start')
  const actions = states[currentState]
  for (let i in actions) {
    sendChatAction(user.id, 'typing')
    try {
      if (actions[i].condition(user)) {
        actions[i].action(user)
        return 0
      }
    } catch (e) { sendMessage(user.chat, [e, e.name, e.message]) }
  }
  setProperty(user.id, 'state', currentState)
  return sendMessage(user.chat, MSG_errorInBot)
}