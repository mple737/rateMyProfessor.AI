"use client";
import Image from "next/image";
import { MessageData } from "./lib/utils/types";
import { MouseEvent, useState } from "react";

const defaultMessage: MessageData[] = [
  {
    role: "assistant",
    content: "Hi, I'm the rate my professor Support Agent, how can i assist you today?",
  },
];

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>(defaultMessage);

  async function handleSubmit(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });
    if(!response.body) return;
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;
    while (true) {
      const { value, done } = await reader.read();
      const text = decoder.decode(value, { stream: true });

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ];
      });
      if (done) break;
    }
  }


  return (
    <div className="h-screen mt-20 mx-20">
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.role}: {message.content}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}
