import React, { useState } from 'react';
import Header from './components/Header';
import DataEntryForm from './components/DataEntryForm';
import StatisticalResults from './components/StatisticalResults';
import { processDataInput } from './utils/dataProcessingUtils';
import { ProcessedData } from './types/dataTypes';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  
  const handleDataSubmit = (rawData: string) => {
    const processedData = processDataInput(rawData);
    setProcessedData(processedData);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setProcessedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        {!showResults ? (
          <DataEntryForm onSubmit={handleDataSubmit} />
        ) : (
          <StatisticalResults data={processedData!} onReset={handleReset} />
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