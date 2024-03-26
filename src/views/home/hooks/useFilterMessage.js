export const useFilterMessage = (message, restData) => {
  const msgType = message.spiedResType
  const _msg = handleMessage(msgType, message)
  return _msg // 返回处理后的消息
}

function handleMessage(type, message) {
  let _msg = null
  switch (type) {
    case '交易占比':
      // 处理逻辑
      _msg = message
      break

    default:
      break
  }
  console.log('处理后的消息：', _msg)
  return _msg
}
