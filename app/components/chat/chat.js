
"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { ThreeDot } from "react-loading-indicators"

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Tina. Thoughtful AI support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; // Don't send empty messages
    setIsLoading(true);

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="d-flex flex-column h-100" >
      <div className="card-header bg-primary text-white">
        <div className="d-flex align-items-center p-2"
        style={{ backgroundImage: "linear-gradient(to right, #ff9e00, #e52a71,#a500dd,#14235a)" }}
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
            alt="Tina avatar"
            className="rounded-circle me-2"
            width="40"
            height='40'
           
          />
          <div>
            <h5 className="mb-0">Tina</h5>
            <small>Thoughtful AI Representative</small>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: "calc(100% - 100px)" }}>
        {messages.map((message, index) => (
          <div key={index} className={`d-flex ${message.role === "assistant" ? "justify-content-start" : "justify-content-end"} mb-3`}>
            <div className={`card ${message.role === "assistant" ? "bg-light" : "bg-primary text-white"}`} style={{ maxWidth: "75%" }}>
              <div className="card-body py-2 px-3">
                <p className="mb-0">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="d-flex justify-content-start mb-3">
            <div className="card bg-light" style={{ maxWidth: "75%" }}>
              <div className="card-body py-2 px-3">
                <ThreeDot color="#6c757d" size="small" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-light">
        <div className="input-group">
          <textarea
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{ resize: "none", overflow: "auto", minHeight: "30px", maxHeight: "80px", }}
          ></textarea>
          <button className="" type="button" onClick={sendMessage} style={{ width: "5rem", color: "#e52a71", fontSize: "40px", paddingLeft:"10px" }}>
          <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
}
