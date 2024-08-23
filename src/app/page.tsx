"use client";
import Image from "next/image";
import { MessageData } from "./lib/utils/types";
import { useState } from "react";

const defaultMessage: MessageData[] = [
  {
    role: "assistant",
    content: "Hi, I'm the Finance Support Agent, how can i assist you today?",
  },
];

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>(defaultMessage);

  async function handle() {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;
    while (true) {
      try {
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
      } catch (error) {}
    }
  }
}
