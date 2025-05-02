import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DataEntryFormProps {
  onSubmit: (data: string) => void;
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the input
    if (!inputValue.trim()) {
      setError('Please enter data values');
      return;
    }
    
    // Check if input contains valid numbers
    const values = inputValue.trim().split(/[\s,;]+/);
    for (const value of values) {
      if (value === '') continue;
      if (isNaN(Number(value))) {
        setError(`Invalid number: ${value}`);
        return;
      }
    }
    
    // Valid input, proceed with submission
    setError(null);
    onSubmit(inputValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Statistical Analysis Calculator</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="dataInput" className="block mb-2 text-sm font-medium text-gray-700">
            Enter your data values (separated by commas, spaces, or new lines):
          </label>
          <textarea
            id="dataInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32"
            placeholder="e.g. 12, 15, 18, 22, 25, 30, 32, 35, 38, 42, 45, 48"
          />
          <p className="mt-2 text-sm text-gray-500">
            The calculator will automatically organize the data and provide a complete statistical analysis.
          </p>
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>Analyze Data</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-md font-medium text-gray-700 mb-3">What this calculator does:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Arranges your data in ascending order</li>
          <li>Calculates the range, number of classes, and class width</li>
          <li>Creates a frequency distribution table</li>
          <li>Calculates measures of central tendency (mean, median, mode)</li>
          <li>Calculates measures of dispersion (variance, standard deviation)</li>
        </ul>
      </div>
    </div>
  );
};

export default DataEntryForm;