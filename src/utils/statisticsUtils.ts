import { GroupedDataItem, StatisticalResults, FrequencyTableRow } from '../types/dataTypes';

// Helper functions
const sum = (arr: number[]): number => arr.reduce((acc, val) => acc + val, 0);
const round = (num: number, decimals = 4): number => Number(num.toFixed(decimals));

// Calculate statistics for ungrouped data
export const calculateUngroupedStatistics = (data: number[]): StatisticalResults => {
  if (data.length === 0) {
    throw new Error('Data array is empty');
  }
  
  const sortedData = [...data].sort((a, b) => a - b);
  
  // Mean
  const mean = sum(data) / data.length;
  
  // Median
  let median: number;
  const middle = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    median = (sortedData[middle - 1] + sortedData[middle]) / 2;
  } else {
    median = sortedData[middle];
  }
  
  // Mode
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  
  sortedData.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
    }
  });
  
  const mode = Object.keys(frequency)
    .filter(key => frequency[Number(key)] === maxFreq)
    .map(Number);
  
  // The data is multimodal and all values appear the same number of times
  const modeResult = maxFreq === 1 ? null : mode;
  
  // Standard Deviation
  const squareDiffs = data.map(value => Math.pow(value - mean, 2));
  const variance = sum(squareDiffs) / data.length;
  const standardDeviation = Math.sqrt(variance);
  
  return {
    mean: round(mean),
    median: round(median),
    mode: modeResult ? modeResult.map(m => round(m)) : null,
    standardDeviation: round(standardDeviation),
  };
};

// Generate table rows for ungrouped data
export const generateUngroupedFrequencyTable = (data: number[]): FrequencyTableRow[] => {
  if (data.length === 0) return [];
  
  // Sort data
  const sortedData = [...data].sort((a, b) => a - b);
  
  // Create table rows
  return sortedData.map(value => ({
    dataPoint: value,
    x2: Math.pow(value, 2)
  }));
};

// Calculate statistics for grouped data
export const calculateGroupedStatistics = (groupedData: GroupedDataItem[]): StatisticalResults => {
  if (groupedData.length === 0) {
    throw new Error('Grouped data array is empty');
  }
  
  // Sort class intervals by lower bound
  const sortedData = [...groupedData].sort((a, b) => a.lowerBound - b.lowerBound);
  
  // Calculate midpoints and frequency * midpoint
  const midpoints = sortedData.map(item => (item.lowerBound + item.upperBound) / 2);
  const totalFrequency = sum(sortedData.map(item => item.frequency));
  const fxValues = sortedData.map((item, i) => item.frequency * midpoints[i]);
  
  // Mean
  const mean = sum(fxValues) / totalFrequency;
  
  // Median
  const cumulativeFreq = [];
  let runningTotal = 0;
  
  for (const item of sortedData) {
    runningTotal += item.frequency;
    cumulativeFreq.push(runningTotal);
  }
  
  const medianPosition = totalFrequency / 2;
  let medianClass = 0;
  
  while (medianClass < cumulativeFreq.length && cumulativeFreq[medianClass] < medianPosition) {
    medianClass++;
  }
  
  const prevCumulativeFreq = medianClass > 0 ? cumulativeFreq[medianClass - 1] : 0;
  
  const medianItem = sortedData[medianClass];
  const classWidth = medianItem.upperBound - medianItem.lowerBound;
  
  const median = medianItem.lowerBound + 
    ((medianPosition - prevCumulativeFreq) / medianItem.frequency) * classWidth;
  
  // Mode
  let modeClass = 0;
  let maxFreq = sortedData[0].frequency;
  
  for (let i = 1; i < sortedData.length; i++) {
    if (sortedData[i].frequency > maxFreq) {
      maxFreq = sortedData[i].frequency;
      modeClass = i;
    }
  }
  
  const modeItem = sortedData[modeClass];
  
  let d1 = 0;
  let d2 = 0;
  
  if (modeClass > 0) {
    d1 = modeItem.frequency - sortedData[modeClass - 1].frequency;
  } else {
    d1 = modeItem.frequency;
  }
  
  if (modeClass < sortedData.length - 1) {
    d2 = modeItem.frequency - sortedData[modeClass + 1].frequency;
  } else {
    d2 = modeItem.frequency;
  }
  
  const mode = d1 + d2 === 0 
    ? modeItem.lowerBound + ((modeItem.upperBound - modeItem.lowerBound) / 2)
    : modeItem.lowerBound + (d1 / (d1 + d2)) * (modeItem.upperBound - modeItem.lowerBound);
  
  // Standard Deviation
  const fxSquared = sortedData.map((item, i) => 
    item.frequency * Math.pow(midpoints[i] - mean, 2)
  );
  
  const variance = sum(fxSquared) / totalFrequency;
  const standardDeviation = Math.sqrt(variance);
  
  return {
    mean: round(mean),
    median: round(median),
    mode: [round(mode)],
    standardDeviation: round(standardDeviation),
  };
};

// Generate frequency table rows for grouped data
export const generateGroupedFrequencyTable = (groupedData: GroupedDataItem[]): FrequencyTableRow[] => {
  if (groupedData.length === 0) return [];
  
  // Sort class intervals by lower bound
  const sortedData = [...groupedData].sort((a, b) => a.lowerBound - b.lowerBound);
  
  // Create table rows
  const tableData: FrequencyTableRow[] = [];
  let cumulativeFreq = 0;
  
  for (const item of sortedData) {
    const midpoint = (item.lowerBound + item.upperBound) / 2;
    cumulativeFreq += item.frequency;
    
    tableData.push({
      class: `${item.lowerBound} - ${item.upperBound}`,
      classLimits: `${item.lowerBound} - ${item.upperBound}`,
      frequency: item.frequency,
      cumulativeFrequency: cumulativeFreq,
      midpoint: round(midpoint, 2),
      fx: round(midpoint * item.frequency, 2),
      x2: round(Math.pow(midpoint, 2), 2),
      fx2: round(item.frequency * Math.pow(midpoint, 2), 2)
    });
  }
  
  return tableData;
};