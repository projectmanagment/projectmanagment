function doPost(e) {
  const contents = JSON.parse(e.postData.contents)
  debug(contents)

  let user = {
    contents: contents,
  }

  if (contents.hasOwnProperty('message')) {
    user.id = String(contents.message.from.id)
    user.name = contents.message.from.first_name
    user.nickName = contents.message.from.username
    user.chat = String(contents.message.chat.id)
    user.message = contents.message.text
    user.chatName = decodeURIComponent(contents.message.chat.title)
    user = checkUserPermissions(user, contents)

    main(user)

  } else if (contents.hasOwnProperty('callback_query')) {
    user.message = contents.callback_query.data
    if (user.message == 'null') { return }

    user.id = String(contents.callback_query.from.id)
    user.name = contents.callback_query.from.first_name
    user.nickName = contents.callback_query.from.username
    user.chat = String(contents.callback_query.message.chat.id)
    user = checkUserPermissions(user, contents)

    if (/permissionLevel/.test(user.message) && (user.id === ADMIN)) {
      try { adminSetPermissionLevel(user) } catch (e) { Logger.log(e) }
    } else {
      main(user)
    }

  }
}