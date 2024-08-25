'use client';
import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { TextField, Box, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MessageData } from './lib/utils/types';

interface Message {
  role: 'user' | 'ai';
  content: string;
  loading?: boolean; // Optional loading property
}

const defaultMessage: MessageData[] = [
  {
    role: "assistant",
    content: "Hi, I'm the rate my professor Support Agent, how can I assist you today?",
  },
];

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>(defaultMessage);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }
  const [showWelcome, setShowWelcome] = useState(true);


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



  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box
      className="flex justify-center items-center w-full bg-slate-700"
      sx={{
        backgroundImage: 'linear-gradient(45deg, #564c9a, #010104, #590b73)',
        minHeight: '100vh', // Ensure the container takes full height
      }}
    >
      <Box
        sx={{
          borderRadius: 6,
          p: 2,
          width: '70%',
          height: '70vh', // Adjust height as needed
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Push content to the bottom
          backgroundColor: '#191a1a',
          border: 'solid 1px #3d3f40',
          overflow: 'hidden',
          marginBottom: '1px', // Adjust margin to move chat container up from the bottom
          '& ::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'transparent',
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: '#014257',
            borderRadius: '4px',
          },
          '& ::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#016c8f',
            width: '10px',
          },
        }}
      >
        {showWelcome && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography
              variant="h2"
              color="white"
              sx={{
                fontWeight: 600,
                fontSize: '45px',
                lineHeight: '1.11429',
                letterSpacing: '-0.2px',
                fontFamily: '"Helvetica Neue"',
                color: '#005e7c',
              }}
            >
              Rate your Professor
            </Typography>
          </Box>
        )}


        <Box sx={{
          overflowY: 'auto',
          flexGrow: 1,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>


          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: msg.role === 'user' ? '#4c4388' : '#202222',
                color: 'white',
                borderRadius: 10,
                p: 2,
                mb: 2,
                width: '70%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                display: 'flex',
                alignItems: 'center',
              }}
            >

              <Typography variant="body1">
                {msg.role === 'assistant' && msg.loading ? (
                  <span style={{ fontWeight: 'bold', color: '#FF5733' }}>Loading...</span>
                ) : (
                  <>
                    {msg.role === 'assistant' && <span style={{ fontWeight: 'bold', color: '#FF5733' }}>Assistant:</span>}
                    {msg.content}
                  </>
                )}


              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField

            variant="outlined"
            value={message}
            onChange={handleInputChange}
            placeholder="Type..."
            inputRef={inputRef}
            multiline
            minRows={1}
            maxRows={4}

            sx={{
              flexGrow: 1,
              mr: 1,
              backgroundColor: '#202222',

              border: 'solid 1px #3d3f40',

              borderRadius: 10,

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },

                '&:hover fieldset': {
                  borderColor: 'transparent',
                },

                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },

              },

              '& .MuiInputBase-input': {
                color: 'white',
              },

              '& .MuiInputBase-input::placeholder': {
                color: '#3d3f40',
              },
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{

              bgcolor: '#4c4388',
              color: 'white',
              width: '60px',
              height: '56px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};



export default ChatComponent;
