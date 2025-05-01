import React, { useState } from 'react';
import DataInput from './components/DataInput';
import Results from './components/Results';
import { DataType } from './types/dataTypes';
import Header from './components/Header';

function App() {
  const [dataType, setDataType] = useState<DataType>('ungrouped');
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<number[]>([]);
  const [groupedData, setGroupedData] = useState<Array<{lowerBound: number, upperBound: number, frequency: number}>>([]);
  
  const handleReset = () => {
    setShowResults(false);
    setData([]);
    setGroupedData([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        {!showResults ? (
          <DataInput 
            dataType={dataType}
            setDataType={setDataType}
            data={data}
            setData={setData}
            groupedData={groupedData}
            setGroupedData={setGroupedData}
            setShowResults={setShowResults}
          />
        ) : (
          <Results 
            dataType={dataType}
            data={data}
            groupedData={groupedData}
            onReset={handleReset}
          />
        )}
      </main>
      
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Statistics & Probability Calculator by Muhammad Umar FA21-BCS-126
        </div>
      </footer>
    </div>
  );
}

export default App;