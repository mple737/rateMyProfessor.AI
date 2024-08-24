'use client';
import React, { useState, useRef, useEffect } from 'react';
import { TextField, Box, Typography, IconButton } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ChatComponent = () => {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string; }[]>([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleInputChange = (e: any) => {
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
      className="flex justify-center items-center h-full w-full bg-slate-700"
      sx={{
        backgroundImage: 'linear-gradient(45deg, #564c9a, #010104, #590b73)',
      }}
    >
      <Box
        sx={{
          borderRadius: 6,
          p: 2,
          width: '80%',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#191a1a',
          backdropFilter: '50px',
          border: 'solid 1px #3d3f40',
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
                display: 'flex',
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
                bgcolor: msg.role === 'user' ? '#3f51b5' : '#424242',
                color: 'white',
                backgroundColor: msg.role === 'user' ? '#4c4388' : '#202222',
                borderRadius: 10,
                justifySelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                p: 4,
                mb: 4,
                width: '70%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1">
                {msg.role === 'user' ? msg.content : (
                  <span style={{ fontWeight: 'bold', color: '#FF5733' }}>Answer:</span>
                )}
                {msg.content}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
              width: '100%',
              transition: 'height 0.2s ease',
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
              '& .MuiInputBase-inputMultiline': {
                color: 'white',
              },
              '& .MuiInputBase-inputMultiline::placeholder': {
                color: '#3d3f40',
                opacity: 1,
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
