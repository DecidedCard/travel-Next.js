import React from "react";
import { FaGithub } from 'react-icons/fa';
import { RiNotionFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-5 mt-3">
      <p className="text-xl font-bold text-gray-300 mb-2">여행한탕</p>
      <p className="max-w-md mx-auto mb-2">Your Trip will be more Memorable When you are With us.</p>
      <div className="flex justify-center space-x-6 my-1">
        <a href="https://github.com/DecidedCard/travel-Next.js" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition-colors duration-300">
          <FaGithub size="28" />
        </a>
        <a href="https://teamsparta.notion.site/8-e2eb6b4d004b406397903885d2444934" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition-colors duration-300">
          <RiNotionFill size="28" />
        </a>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Copyright © 2024 여행한탕. All rights reserved. Designed By 여행한탕</p>
      </div>
    </footer>
  );
};

export default Footer;
