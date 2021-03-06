import React, { useEffect, useState } from "react";

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}


const Chat: React.FC = () => {

    const [wsChannel, setWSChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            ws.addEventListener('close', () => {
                console.log('close WS')
                setTimeout(createChannel, 3000)
            })

        }
        function createChannel() {
            ws?.removeEventListener("close", closeHandler)
            ws?.close()


            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWSChannel(ws)

        }
        createChannel();
        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }

    }, [])

    // useEffect(()=>{
    //     wsChannel?.addEventListener('close', () => {
    //         console.log('close WS')
    //     })

    // }, [wsChannel])


    return <div>
        <Messages wsChannel={wsChannel} />
        <AddMessageForm wsChannel={wsChannel} />
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        let msgHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener("message", msgHandler)

        return () => {
            wsChannel?.removeEventListener("message", msgHandler)
        }
    }, [wsChannel])
    return <div style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((m, index) => <ChatMessage key={index} message={m} />)}
    </div>
}

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return <div>
        <img src={message.photo} style={{ width: '40px' }} /><b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
}
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus("ready")
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage("")
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={wsChannel == null || readyStatus !== "ready"} onClick={sendMessage}>send</button>
        </div>
    </div>
}

export default ChatPage