import {WS_ADDRESS} from "@/configs";

function useWebSocket (handleMessage) {
    const ws = new WebSocket(WS_ADDRESS)

    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        ws.addEventListener('open', handleOpen,false)
        ws.addEventListener('close', handleClose,false)
        ws.addEventListener('error', handleError,false)
        ws.addEventListener('message', handleMessage,false)
    }

    function handleOpen (e) {
        console.log('WebSocket连接已打开', e)
    }

    function handleClose (e) {
        console.log('WebSocket连接已关闭', e)
    }

    function  handleError (e) {
        console.log('WebSocket连接出错', e)
    }


    init()

    return ws
}

export default useWebSocket