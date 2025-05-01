import React, { useState } from 'react';

interface UngroupedDataInputProps {
  data: number[];
  setData: React.Dispatch<React.SetStateAction<number[]>>;
}

const UngroupedDataInput: React.FC<UngroupedDataInputProps> = ({ data, setData }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddData = () => {
    // Remove extra spaces and split by common separators (comma, space, semicolon)
    const values = inputValue.trim().split(/[\s,;]+/);
    
    const newNumbers: number[] = [];
    let hasError = false;
    
    for (const value of values) {
      if (value === '') continue;
      
      const num = Number(value);
      if (isNaN(num)) {
        setError(`Invalid number: ${value}`);
        hasError = true;
        break;
      }
      newNumbers.push(num);
    }
    
    if (!hasError) {
      if (newNumbers.length === 0) {
        setError('Please enter at least one valid number');
      } else {
        setData([...data, ...newNumbers]);
        setInputValue('');
        setError(null);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddData();
    }
  };

  const removeDataPoint = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="ungroupedData" className="block mb-2 text-sm font-medium text-gray-700">
          Enter numbers separated by commas, spaces, or new lines:
        </label>
        <div className="flex">
          <input
            id="ungroupedData"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 12, 15, 18, 22"
          />
          <button
            onClick={handleAddData}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      {data.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Data Points:</h3>
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border border-gray-200 max-h-40 overflow-y-auto">
            {data.map((value, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white px-2 py-1 rounded border border-gray-300"
              >
                <span className="mr-2">{value}</span>
                <button
                  onClick={() => removeDataPoint(index)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UngroupedDataInput;