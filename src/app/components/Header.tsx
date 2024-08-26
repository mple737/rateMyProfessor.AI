"use client";

import { SignedOut, SignInButton, SignedIn, UserButton, useUser, SignOutButton } from '@clerk/nextjs';
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Header() {

  const { isSignedIn } = useUser();

  const router = useRouter(); 

  const handleLogoClick = () => {
    router.push('/'); 
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-transparent text-white flex justify-between items-center z-50">
      
      <h1 className="ml-4 text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent cursor-pointer"
       onClick={handleLogoClick}>

      RateMyProfessor.AI
      </h1>

      <div className="flex items-center space-x-4">
        <SignedOut>
          <div className="mr-4 px-2 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <SignInButton>Log in</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="mr-4 px-2 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <UserButton showName />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}