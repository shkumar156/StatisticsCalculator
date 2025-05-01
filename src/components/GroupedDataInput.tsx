import React, { useState } from 'react';
import { GroupedDataItem } from '../types/dataTypes';

interface GroupedDataInputProps {
  groupedData: GroupedDataItem[];
  setGroupedData: React.Dispatch<React.SetStateAction<GroupedDataItem[]>>;
}

const GroupedDataInput: React.FC<GroupedDataInputProps> = ({ 
  groupedData, 
  setGroupedData 
}) => {
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddInterval = () => {
    // Validate inputs
    const lower = Number(lowerBound);
    const upper = Number(upperBound);
    const freq = Number(frequency);
    
    if (isNaN(lower) || isNaN(upper) || isNaN(freq)) {
      setError('Please enter valid numbers');
      return;
    }
    
    if (lower >= upper) {
      setError('Upper bound must be greater than lower bound');
      return;
    }
    
    if (freq <= 0 || !Number.isInteger(freq)) {
      setError('Frequency must be a positive integer');
      return;
    }
    
    // Check for overlapping intervals
    for (const item of groupedData) {
      if ((lower >= item.lowerBound && lower < item.upperBound) || 
          (upper > item.lowerBound && upper <= item.upperBound) ||
          (lower <= item.lowerBound && upper >= item.upperBound)) {
        setError('New interval overlaps with existing intervals');
        return;
      }
    }
    
    setGroupedData([...groupedData, { lowerBound: lower, upperBound: upper, frequency: freq }]);
    setLowerBound('');
    setUpperBound('');
    setFrequency('');
    setError(null);
  };

  const removeInterval = (index: number) => {
    setGroupedData(groupedData.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
        <div>
          <label htmlFor="lowerBound" className="block mb-1 text-sm font-medium text-gray-700">
            Lower Bound
          </label>
          <input
            id="lowerBound"
            type="number"
            value={lowerBound}
            onChange={(e) => setLowerBound(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 10"
          />
        </div>
        <div>
          <label htmlFor="upperBound" className="block mb-1 text-sm font-medium text-gray-700">
            Upper Bound
          </label>
          <input
            id="upperBound"
            type="number"
            value={upperBound}
            onChange={(e) => setUpperBound(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 20"
          />
        </div>
        <div>
          <label htmlFor="frequency" className="block mb-1 text-sm font-medium text-gray-700">
            Frequency
          </label>
          <input
            id="frequency"
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 5"
          />
        </div>
      </div>
      
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleAddInterval}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Interval
        </button>
      </div>

      {groupedData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Class Intervals:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Interval</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedData
                  .sort((a, b) => a.lowerBound - b.lowerBound)
                  .map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.lowerBound} - {item.upperBound}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.frequency}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <button
                          onClick={() => removeInterval(index)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupedDataInput;