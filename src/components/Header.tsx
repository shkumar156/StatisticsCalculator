import React from 'react';
import { BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Statistics & Probability Calculator by Muhammad Umar FA21-BCS-126</h1>
        </div>
        <div className="text-sm text-gray-600 hidden sm:block">
          Data Analysis & Statistical Measures
        </div>
      </div>
    </header>
  );
};

export default Header;