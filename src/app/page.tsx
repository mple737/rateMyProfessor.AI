'use client';
import React, { useState, useRef, useEffect } from 'react';
import { TextField, Box, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

interface Message {
  role: 'user' | 'ai';
  content: string;
  loading?: boolean; // Optional loading property
}

const defaultMessage: Message[] = [
  {
    role: 'ai',
    content: "Hi, I'm the rate my professor Support Agent, how can I assist you today?",
  },
];

const ChatComponent: React.FC = () => {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(defaultMessage);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      setShowWelcome(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: input },
      ]);
      setInput('');
      setIsLoading(true);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'ai', content: 'Loading...', loading: true },
        ]);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { role: 'ai', content: `Answer: ${input}`, loading: false },
          ]);
          setIsLoading(false);
        }, 2000);
      }, 500);
    }
  };

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
                {msg.role === 'ai' && msg.loading ? (
                  <span style={{ fontWeight: 'bold', color: '#FF5733' }}>Loading...</span>
                ) : (
                  <>
                    {msg.role === 'ai' && <span style={{ fontWeight: 'bold', color: '#FF5733' }}>Answer:</span>}
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
            value={input}
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
            onClick={handleSend}
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
