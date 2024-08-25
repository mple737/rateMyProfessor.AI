// components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-blue-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-300">
            Copyright &copy; RateMyProfessor.AI 2024
          </div>
          <div className="mt-2 sm:mt-0 text-sm">
            <a className="mx-2 hover:text-blue-400" href="#!">Privacy</a>
            <span>&middot;</span>
            <a className="mx-2 hover:text-blue-400" href="#!">Terms</a>
            <span>&middot;</span>
            <a className="mx-2 hover:text-blue-400" href="#!">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
