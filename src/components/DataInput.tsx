import React, { useState } from 'react';
import { DataType, GroupedDataItem } from '../types/dataTypes';
import UngroupedDataInput from './UngroupedDataInput';
import GroupedDataInput from './GroupedDataInput';

interface DataInputProps {
  dataType: DataType;
  setDataType: React.Dispatch<React.SetStateAction<DataType>>;
  data: number[];
  setData: React.Dispatch<React.SetStateAction<number[]>>;
  groupedData: GroupedDataItem[];
  setGroupedData: React.Dispatch<React.SetStateAction<GroupedDataItem[]>>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataInput: React.FC<DataInputProps> = ({
  dataType,
  setDataType,
  data,
  setData,
  groupedData,
  setGroupedData,
  setShowResults
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    if (dataType === 'ungrouped' && data.length === 0) {
      setError('Please enter at least one data point');
      return;
    }
    
    if (dataType === 'grouped' && groupedData.length === 0) {
      setError('Please enter at least one class interval');
      return;
    }
    
    setError(null);
    setShowResults(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Enter Your Data</h2>
      
      <div className="mb-6">
        <div className="flex items-center space-x-6 mb-4">
          <label className="font-medium text-gray-700">Data Type:</label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                dataType === 'ungrouped' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setDataType('ungrouped')}
            >
              Ungrouped
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                dataType === 'grouped' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setDataType('grouped')}
            >
              Grouped
            </button>
          </div>
        </div>
        
        {dataType === 'ungrouped' ? (
          <UngroupedDataInput data={data} setData={setData} />
        ) : (
          <GroupedDataInput groupedData={groupedData} setGroupedData={setGroupedData} />
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => {
            setData([]);
            setGroupedData([]);
            setError(null);
          }}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleCalculate}
        >
          Calculate Statistics
        </button>
      </div>
    </div>
  );
};

export default DataInput;