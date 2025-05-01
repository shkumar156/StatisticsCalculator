import React from 'react';
import { FrequencyTableRow } from '../types/dataTypes';

interface FrequencyTableProps {
  rows: FrequencyTableRow[];
  isGroupedData: boolean;
  showTotals?: boolean;
}

const FrequencyTable: React.FC<FrequencyTableProps> = ({ 
  rows, 
  isGroupedData,
  showTotals = true 
}) => {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm animate-fadeIn">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isGroupedData ? 'Class Interval' : 'Data Point'}
            </th>
            {isGroupedData && (
              <>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequency (f)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cumulative Frequency
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Midpoint (x)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  f·x
                </th>
              </>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              x²
            </th>
            {isGroupedData && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                f·x²
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2 whitespace-nowrap">
                {isGroupedData ? row.class : row.dataPoint}
              </td>
              {isGroupedData && (
                <>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {row.frequency}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {row.cumulativeFrequency}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {row.midpoint}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {row.fx}
                  </td>
                </>
              )}
              <td className="px-4 py-2 whitespace-nowrap">
                {row.x2?.toFixed(2)}
              </td>
              {isGroupedData && (
                <td className="px-4 py-2 whitespace-nowrap">
                  {row.fx2}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FrequencyTable;