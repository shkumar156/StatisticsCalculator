import React from 'react';
import { DataType, GroupedDataItem, StatisticalResults } from '../types/dataTypes';
import { 
  calculateUngroupedStatistics, 
  calculateGroupedStatistics,
  generateUngroupedFrequencyTable,
  generateGroupedFrequencyTable
} from '../utils/statisticsUtils';
import FrequencyTable from './FrequencyTable';
import { ArrowLeft } from 'lucide-react';

interface ResultsProps {
  dataType: DataType;
  data: number[];
  groupedData: GroupedDataItem[];
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ 
  dataType, 
  data, 
  groupedData,
  onReset
}) => {
  // Calculate statistics based on data type
  const statistics: StatisticalResults = React.useMemo(() => {
    try {
      if (dataType === 'ungrouped') {
        return calculateUngroupedStatistics(data);
      } else {
        return calculateGroupedStatistics(groupedData);
      }
    } catch (error) {
      console.error('Error calculating statistics:', error);
      return {
        mean: 0,
        median: 0,
        mode: null,
        standardDeviation: 0
      };
    }
  }, [dataType, data, groupedData]);

  // Generate frequency table rows
  const tableRows = React.useMemo(() => {
    if (dataType === 'ungrouped') {
      return generateUngroupedFrequencyTable(data);
    } else {
      return generateGroupedFrequencyTable(groupedData);
    }
  }, [dataType, data, groupedData]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Statistical Results</h2>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Frequency Distribution Table</h3>
        <FrequencyTable 
          rows={tableRows} 
          isGroupedData={dataType === 'grouped'}
        />
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Statistical Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">Measures of Central Tendency</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Mean</div>
                  <div className="text-lg font-semibold">{statistics.mean}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Median</div>
                  <div className="text-lg font-semibold">{statistics.median}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Mode</div>
                  <div className="text-lg font-semibold">
                    {statistics.mode 
                      ? statistics.mode.join(', ') 
                      : 'No mode (all values appear equally often)'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">Measures of Dispersion</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Standard Deviation</div>
                  <div className="text-lg font-semibold">{statistics.standardDeviation}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Variance</div>
                  <div className="text-lg font-semibold">{(statistics.standardDeviation ** 2).toFixed(4)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Interpretation</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Mean ({statistics.mean}):</strong> This represents the average value of your dataset.
            It's calculated by dividing the sum of all values by the number of values.
          </p>
          <p>
            <strong>Median ({statistics.median}):</strong> This is the middle value when your data is arranged in order.
            It's less affected by extreme values compared to the mean.
          </p>
          <p>
            <strong>Mode ({statistics.mode ? statistics.mode.join(', ') : 'None'}):</strong> {' '}
            {statistics.mode
              ? 'This represents the most frequently occurring value(s) in your dataset.'
              : 'Your data has no mode, which means all values appear with equal frequency.'}
          </p>
          <p>
            <strong>Standard Deviation ({statistics.standardDeviation}):</strong> This measures how spread out the values are from the mean.
            A lower standard deviation indicates data points are closer to the mean.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;