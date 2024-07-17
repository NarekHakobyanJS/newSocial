import React, { useEffect, useState } from 'react'




export type chatMessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string

}

type MessagePropsType = {
  message: chatMessageType
}

type MessagesPropsType = {

  ws: WebSocket | null
}
const Message = ({ message }: MessagePropsType) => {

  return (
    <div>
      <img src={message?.photo} />
      <b>{message?.userName}</b>
      <br />
      <span>{message?.message}</span>
    </div>
  )
}

const Messages = ({ ws }: MessagesPropsType) => {
  const [messages, setMessages] = useState<chatMessageType[]>([])

  useEffect(() => {
    ws?.addEventListener('message', (e) => {
      setMessages((prev) => {
        return [...prev, ...JSON.parse(e.data)]
      }
      )
    })
  }, [ws])

  return (
    <div style={{ height: "400px", overflowY: 'auto' }}>
      {
        messages.map((message, index) => {
          return <Message key={index} message={message} />
        })
      }
    </div>
  )
}



const Chat = () => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  const [ws, setWs] = useState<WebSocket | null>(null)
  useEffect(() => {


    function createChanel() {
      let wss = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      setWs(wss)

      wss.addEventListener('close', () => {
        console.log('close');
        setTimeout(() => createChanel, 2000)
      })

    }
    createChanel();

  }, [])


  useEffect(() => {
    ws?.addEventListener('open', () => {
      setReadyStatus('ready')
    })

    ws?.addEventListener('close', () => {
      console.log('close');
    })
  }, [ws])


  const sendMessage = () => {
    if (!message) {
      return
    }

    ws?.send(message)
    setMessage('')
  }

  return (
    <div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)}>
      </textarea>
      <button
        disabled={readyStatus !== 'ready'}
        onClick={sendMessage}>send</button>
      <Messages ws={ws} />
    </div>
  )
}

export default Chat