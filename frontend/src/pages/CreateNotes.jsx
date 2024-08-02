import React from 'react'
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


function CreateNotes() {

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Pretty good, thanks for asking!",
      sender: "You",
    },
    {
      id: 2,
      text: "Yeah, it looks great! I'm excited to try it out.",
      sender: "You",
    },
  ])
  const [message, setMessage] = useState("")
  const handleSend = () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "You",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  return (
    <>
      
  
    <div className=" inset-0 z-50 flex items-end justify-end">
      <div className=" h-full bg-background">
        <div className="sticky top-0  w-full flex left-0 items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
          <h3 className="text-lg font-medium">Chat</h3>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === "You" ? "justify-end" : ""}`}>
              <div
                className={`rounded-lg p-3 text-sm ${
                  msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#0c2461] px-4 py-3">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="h-10  resize-none rounded-lg bg-[#0c2461] text-white placeholder:text-gray-400 focus:outline-none"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white disabled:opacity-50"
              disabled={message.trim() === ""}
              onClick={handleSend}
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}



export default CreateNotes


