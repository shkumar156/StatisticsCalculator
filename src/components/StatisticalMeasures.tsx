import React from 'react';
import { StatisticalResults } from '../types/dataTypes';

interface StatisticalMeasuresProps {
  statistics: StatisticalResults;
  dataRange: number;
  classCount: number;
  classWidth: number;
}

const StatisticalMeasures: React.FC<StatisticalMeasuresProps> = ({ 
  statistics, 
  dataRange,
  classCount,
  classWidth
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h4 className="font-medium text-indigo-800 mb-2">Data Classification</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Range</div>
              <div className="text-lg font-semibold">{dataRange}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Number of Classes</div>
              <div className="text-lg font-semibold">{classCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Class Width</div>
              <div className="text-lg font-semibold">{classWidth}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Measures of Central Tendency</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Mean</div>
              <div className="text-lg font-semibold">{statistics.mean.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Median</div>
              <div className="text-lg font-semibold">{statistics.median.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Mode</div>
              <div className="text-lg font-semibold">
                {statistics.mode 
                  ? statistics.mode.map(m => m.toFixed(4)).join(', ') 
                  : 'No mode (all values appear equally often)'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h4 className="font-medium text-green-800 mb-2">Measures of Dispersion</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Variance</div>
              <div className="text-lg font-semibold">{statistics.variance.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Standard Deviation</div>
              <div className="text-lg font-semibold">{statistics.standardDeviation.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-800 mb-3">Interpretation</h4>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-medium">Mean ({statistics.mean.toFixed(4)}):</span> Represents the average value of your dataset.
          </p>
          <p>
            <span className="font-medium">Median ({statistics.median.toFixed(4)}):</span> The middle value when your data is arranged in order.
          </p>
          <p>
            <span className="font-medium">Mode:</span> {' '}
            {statistics.mode
              ? `${statistics.mode.map(m => m.toFixed(4)).join(', ')} - The most frequently occurring value(s).`
              : 'Your data has no mode, which means all values appear with equal frequency.'}
          </p>
          <p>
            <span className="font-medium">Variance ({statistics.variance.toFixed(4)}):</span> Measures the average of the squared differences from the mean.
          </p>
          <p>
            <span className="font-medium">Standard Deviation ({statistics.standardDeviation.toFixed(4)}):</span> Indicates how spread out the values are from the mean.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasures;