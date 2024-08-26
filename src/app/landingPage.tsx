"use client";

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@mui/material';

const Page: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <main className="flex w-full h-full bg-cover bg-center bg-[url('/img/ai.avif')]">
      {/* Main Section with Background Image */}
      <div className="relative w-full flex flex-col items-center bg-black bg-opacity-60 h-full p-6">
        <section className="relative flex flex-col items-center z-10 text-center pt-24"> {/* Increased padding-top for larger screens */}
          {/* "Welcome to" with Dot SVG */}
          <section className="flex flex-col items-center mb-2 text-center">
            <div className="relative uppercase tracking-widest text-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 flex items-center">
              
              {/* Dot SVG */}
              <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
                <svg
                  className="text-purple-600"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
                <svg
                  className="text-purple-500"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
                <svg
                  className="text-purple-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
              </div>

              {/* "Welcome to" Text */}
              <span className="ml-2 md:ml-4 mr-2 md:mr-4 text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase">
                Welcome to
              </span>

              <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
                <svg
                  className="text-purple-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
                <svg
                  className="text-purple-500"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
                <svg
                  className="text-purple-600"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </section>

          {/* Main Title */}
          <div className="text-[3rem] md:text-[4rem] lg:text-[5rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 shadow-lg">
            Rate My Professor
          </div>

          {/* Sub Title */}
          <p className="relative uppercase tracking-widest text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-8 shadow-lg">
            <span> AI ASSISTANT </span>
          </p>

          {/* Get Started Button */}
          <div className="flex flex-col items-center mb-8">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition mb-4">
              <SignInButton>Get Started</SignInButton>
            </div>

            {/* About Us Section */}
            <AnimatePresence mode='wait'> 
              <motion.div
                className="relative flex flex-col items-center justify-center w-full sm:w-5/6 md:w-4/5 lg:w-3/4 bg-transparent p-8 mt-12 lg:mt-16" // Adjusted margin-top for spacing on larger screens
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {/* About Section Title */}
                <Typography
                  variant="h3"
                  component="div"
                  className="uppercase tracking-widest bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold mb-6"
                >
                  About Us
                </Typography>

                {/* About Section Content */}
                <Typography
                  variant="body1"
                  component="p"
                  className="text-white text-center text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text font-bold text-transparent max-w-4xl mx-auto px-1"
                >
                  Welcome to <span className="font-semibold text-purple-400">RATE MY PROFESSOR AI ASSISTANT</span>! 
                  We are dedicated to providing innovative AI solutions through our advanced assistant bot for Rate My Professor. 
                  Our mission is to enhance your experience with insightful and engaging interactions powered by cutting-edge technology. 
                  Whether you're a student seeking guidance or an educator looking for feedback, our platform delivers intuitive and effective assistance.
                  
                </Typography>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
