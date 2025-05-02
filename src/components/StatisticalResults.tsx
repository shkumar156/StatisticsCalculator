import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProcessedData } from '../types/dataTypes';
import FrequencyDistributionTable from './FrequencyDistributionTable';
import StatisticalMeasures from './StatisticalMeasures';

interface StatisticalResultsProps {
  data: ProcessedData;
  onReset: () => void;
}

const StatisticalResults: React.FC<StatisticalResultsProps> = ({ data, onReset }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Statistical Analysis Results</h2>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Enter New Data</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Original Data (Sorted)</h3>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 max-h-32 overflow-y-auto">
            <p className="text-gray-700 break-words">
              {data.sortedData.join(', ')}
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Frequency Distribution Table</h3>
          <FrequencyDistributionTable 
            rows={data.frequencyTable} 
            totalFrequency={data.totalFrequency}
            totalFx={data.totalFx}
            totalFx2={data.totalFx2}
          />
        </div>
        
        <StatisticalMeasures 
          statistics={data.statistics}
          dataRange={data.range}
          classCount={data.classCount}
          classWidth={data.classWidth}
        />
      </div>
    </div>
  );
};

export default StatisticalResults;