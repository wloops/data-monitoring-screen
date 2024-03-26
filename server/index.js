const WebSocket = require('ws');

;((Ws) => {
    const server = new Ws.Server({ port: 8000 });

    const init = () => {
        bindEvent()
    }

    function bindEvent(){
        server.on('open', handleOpen)
        server.on('close', handleClose)
        server.on('error', handleError)
        server.on('connection', handleConnection)
    }

    function handleOpen() {
        console.log('WebSocket open.')
    }
    function  handleClose() {
        console.log('WebSocket close.')
    }
    function handleError() {
        console.log('WebSocket error.')
    }
    function handleConnection(ws) {
        console.log('WebSocket connection.')
        ws.on('message', handleMessage)
    }
    function handleMessage(msg) {
        console.log('received: %s', msg)
        const _msg = msg.toString()
        server.clients
            .forEach
            (client => client.send(_msg)) // 广播消息
        // ws.send(`Server received: ${msg}`) // 回复消息
        // console.log('Server sent: %s', msg)

    }

    init()


})(WebSocket)